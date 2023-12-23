import { useState, MutableRefObject, useRef, useEffect } from "react"
import User from "../core/User"
import UserRepository from "../core/UserRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000/users";

export default function useUsers() {
    const [ user, setUser ] = useState<User>(User.empty())
    const [ users, setUsers ] = useState<User[]>([])
    const { showForm, showTable, tableVisible } = useLayout()

    useEffect(listUsers, [])

    function createUser() {
      setUser(User.empty())
      showForm()
    }

    function listUsers() {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          console.log("listUsers then", data)
          return setUsers(data)
        })
    }

    function getUser(user: User) {
      setUser(user)
      showForm()
    }

    async function deleteUser(user: User) {
      listUsers()
    }

    async function saveUser(user: User) {
      console.log("saveUser user", user)
      const userStr = JSON.stringify({
        title: user.title,
        text: user.text,
        isActive: user.isActive
      })
      console.log("saveUser userStr", userStr)
      const response = user?.id
        ? await fetch(`${API_URL}/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: userStr
        })
        : await fetch(`${API_URL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: userStr
        });

      const data = await response.json();
    }

    function criarUser() {
        setUser(User.empty())
        showForm()
    }


    return {
        user,
        users,
        createUser,
        saveUser,
        criarUser,
        deleteUser,
        getUser,
        listUsers,
        showTable,
        tableVisible
    }
}