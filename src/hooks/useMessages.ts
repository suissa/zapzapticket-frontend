import { useState, MutableRefObject, useRef, useEffect } from "react"
import Message from "../core/Message"
import MessageRepository from "../core/MessageRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000/messages";

export default function useMessages() {
  const [message, setMessage] = useState<Message>(Message.empty())
  const [messages, setMessages] = useState<Message[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listMessages, [])

  function createMessage() {
    setMessage(Message.empty())
    showForm()
  }

  function listMessages() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log("listMessages then", data)
        return setMessages(data)
      })
  }

  function getMessage(message: Message) {
    setMessage(message)
    showForm()
  }

  async function deleteMessage(message: Message) {
    listMessages()
  }

  async function saveMessage(message: Message) {
    console.log("saveMessage message", message)
    const messageStr = message?._id
      ? JSON.stringify({
          _id: message._id,
          title: message.title,
          text: message.text,
          isActive: message.isActive
        })
      : JSON.stringify({
        title: message.title,
        text: message.text,
        isActive: message.isActive
      })
    console.log("saveMessage messageStr", messageStr)
    const response = message?._id
      ? await fetch(`${API_URL}/${message._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: messageStr
      })
      : await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: messageStr
      });
      // listMessages()
      showTable();
    ;
  }

  function criarMessage() {
    setMessage(Message.empty())
    showForm()
  }


  return {
    message,
    messages,
    createMessage,
    saveMessage,
    criarMessage,
    deleteMessage,
    getMessage,
    listMessages,
    showTable,
    tableVisible
  }
}