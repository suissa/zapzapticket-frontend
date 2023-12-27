import { useState, MutableRefObject, useRef, useEffect } from "react"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";

const socket = io("http://localhost:9000");
const API_URL = "http://localhost:9000/contacts/messages";

export default function useSend() {
  const [list, setList] = useState([]);


  function listTickets() {
    fetch(`${API_URL}`)
      .then(response => response.json())
      .then(data => {
        console.log("listTickets then", data)
        return setList(data)
      })
  }

  return {
    list,
    setList,
    listTickets
  }
}