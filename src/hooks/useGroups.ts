import { useState, MutableRefObject, useRef, useEffect } from "react"
import Group from "../core/Group"
import GroupRepository from "../core/GroupRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000";

export default function useGroups() {
  const [group, setGroup] = useState<Group>(Group.empty())
  const [groups, setGroups] = useState<Group[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(() => {
    // getProfileImage("Criptou_Onboarding-5511994649923", "5511994458797")
    //   .then(result => {
    //     console.log("useGroups useEffect result", result)
    //   })
  }, [])

  function createGroup() {
    setGroup(Group.empty())
    showForm()
  }

  function listGroups(instanceName = "Criptou_Onboarding-5511994649923") {
    console.log("useGroups listGroups instanceName", instanceName)
    // const instanceName = selectedConnection ? selectedConnection.instanceName : "Criptou_Onboarding-5511994649923";
    console.log("useGroups listGroups instanceName", instanceName)
    fetch(`${API_URL}/evolution/groups/${instanceName}`)
      .then(response => response.json())
      .then(data => {
        console.log("listGroups then", data)
        return setGroups(data)
      })
  }

  function getGroup(group: Group) {
    setGroup(group)
    showForm()
  }

  async function deleteGroup(group: Group) {
    listGroups()
  }

  async function saveGroup(group: Group) {
    console.log("saveGroup group", group)
    const groupStr = group?._id
      ? JSON.stringify({
          _id: group._id,
          title: group.title,
          text: group.text,
          isActive: group.isActive
        })
      : JSON.stringify({
        title: group.title,
        text: group.text,
        isActive: group.isActive
      })
    console.log("saveGroup groupStr", groupStr)
    const response = group?._id
      ? await fetch(`${API_URL}/evolution/groups/${group._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: groupStr
      })
      : await fetch(`${API_URL}/evolution/groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: groupStr
      });
      // listGroups()
      showTable()
    ;
  }

  async function getProfileImage(instanceName: string, number: string) {
    const response = await fetch(`${API_URL}/evolution/profile/${instanceName}/${number}`)
    const data = await response.json()
    console.log("getProfileImage data", data.picture)
    return data.picture
  }

  async function importContacts(instanceName: string, numbers: string, groupId: string) {
    const objStr = JSON.stringify({ groupId, numbers })
    console.log("useGroups importContacts instanceName", instanceName)
    console.log("useGroups importContacts numbers", numbers)
    console.log("useGroups importContacts groupId", groupId)
    const response = await fetch(`${API_URL}/contacts/import/${instanceName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: objStr
    })
    const data = await response.json()
    console.log("importContacts data", data)
    return data
  }

  return {
    group,
    groups,
    createGroup,
    saveGroup,
    deleteGroup,
    getGroup,
    listGroups,
    getProfileImage,
    importContacts,
    showTable,
    tableVisible
  }
}