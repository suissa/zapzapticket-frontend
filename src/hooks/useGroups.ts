import { useState, MutableRefObject, useRef, useEffect } from "react"
import Group from "../core/Group"
import GroupRepository from "../core/GroupRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000/evolution/groups";

export default function useGroups() {
  const [group, setGroup] = useState<Group>(Group.empty())
  const [groups, setGroups] = useState<Group[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  // useEffect(listGroups, [])

  function createGroup() {
    setGroup(Group.empty())
    showForm()
  }

  function listGroups(instanceName = "Criptou_Onboarding-5511994649923") {
    console.log("useGroups listGroups instanceName", instanceName)
    // const instanceName = selectedConnection ? selectedConnection.instanceName : "Criptou_Onboarding-5511994649923";
    console.log("useGroups listGroups instanceName", instanceName)
    fetch(`${API_URL}/${instanceName}`)
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
      ? await fetch(`${API_URL}/${group._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: groupStr
      })
      : await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: groupStr
      });
      // listGroups()
      showTable()
    ;
  }



  return {
    group,
    groups,
    createGroup,
    saveGroup,
    deleteGroup,
    getGroup,
    listGroups,
    showTable,
    tableVisible
  }
}