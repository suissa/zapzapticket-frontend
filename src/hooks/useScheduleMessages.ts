import { useState, MutableRefObject, useRef, useEffect } from "react"
import ScheduleMessage from "../core/ScheduleMessage"
import ScheduleMessageRepository from "../core/ScheduleMessageRepository"
import useLayout from "./useLayout"
import { API_URL } from "../config"

export default function useScheduleMessages() {
  const [scheduleMessage, setScheduleMessage] = useState<ScheduleMessage>(ScheduleMessage.empty())
  const [scheduleMessages, setScheduleMessages] = useState<ScheduleMessage[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listScheduleMessages, [])

  function createScheduleMessage() {
    setScheduleMessage(ScheduleMessage.empty())
    showForm()
  }

  function listScheduleMessages() {
    fetch(`${API_URL}/schedulemessages`)
      .then(response => response.json())
      .then(data => {
        console.log("listScheduleMessages then", data)
        return setScheduleMessages(data)
      })
  }

  function getScheduleMessage(message: ScheduleMessage) {
    setScheduleMessage(message)
    showForm()
  }

  async function deleteScheduleMessage(message: ScheduleMessage) {
    listScheduleMessages()
  }

  async function saveScheduleMessage(message: ScheduleMessage) {
    console.log("saveScheduleMessage message", message)
    const messageStr = message?._id
      ? JSON.stringify({
          _id: message._id,
          text: message.text,
          from: message.from,
          to: message.to
        })
      : JSON.stringify({
        text: message.text,
        from: message.from,
        to: message.to
      })
    console.log("saveScheduleMessage messageStr", messageStr)
    const response = message?._id
      ? await fetch(`${API_URL}/schedulemessages/${message._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: messageStr
      })
      : await fetch(`${API_URL}/schedulemessages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: messageStr
      });
      // listScheduleMessages()
      showTable()
    ;
  }

  return {
    scheduleMessage,
    scheduleMessages,
    createScheduleMessage,
    saveScheduleMessage,
    deleteScheduleMessage,
    getScheduleMessage,
    listScheduleMessages,
    showTable,
    tableVisible
  }
}