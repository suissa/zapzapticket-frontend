import { useState, MutableRefObject, useRef, useEffect } from "react"
import Message from "../core/Message"
import Lane from "../core/Lane"
import MessageRepository from "../core/MessageRepository"
import useLayout from "./useLayout"
import { API_URL } from "../config"

const API_URL_MESSAGES = `${API_URL}/contacts/messages`;

const groupBy = (xs, key) => xs.reduce((rv, x) => ({
  ...rv, [x[key]]: [...(rv[x[key]] || []), x]
}), {});

export default function useMessages() {
  const [message, setMessage] = useState<Message>(Message.empty())
  const [messages, setMessages] = useState<{ lanes: Lane[] } | null>(null);
  const [list, setList] = useState({});
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listMessages, [])

  function createMessage() {
    setMessage(Message.empty())
    showForm()
  }

  function listMessages() {
    fetch(`${API_URL_MESSAGES}`)
      .then(response => response.json())
      .then(data => {
        const lanes = [ ...Object.entries(groupBy(data, "ticketStatus")).map(([key, value], i) => {
          console.log("listMessages then key", key)
          console.log("listMessages then value", value)
          return {
            id: "lane"+i,
            title: key,
            label: `${value.length}/${value.length}`,

            style: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" },  // Style of Lane
            cardStyle: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#6b21a8" }, // Style of Card
            cards: value.map((item: any) => {
              console.log("value.map item", item)
              return {
                id: item._id,
                title: item.name,
                description: item.messages[0].text,
                label: item.ticketStatus,
                metadata: { sha: item._id }
              }
            })
          }
        })]
        const obj = {lanes}
        console.log("listMessages then", obj)
        return setMessages(obj)
      })
      // .then(data => {
      //   console.log("listMessages then", data)
      //   return setMessages( {
      //     lanes: [
      //       {
      //         id: "lane1",
      //         title: "Planned Tasks",
      //         label: "2/2",
      //         cards: [
      //           {id: "Card1", title: "Write Blog", description: "Can AI make memes", label: "30 mins", draggable: false},
      //           {id: "Card2", title: "Pay Rent", description: "Transfer via NEFT", label: "5 mins", metadata: {sha: "be312a1"}}
      //         ]
      //       },
      //       {
      //         id: "lane2",
      //         title: "Completed",
      //         label: "0/0",
      //         cards: []
      //       }
      //     ]
      //   })
      // })
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
      ? await fetch(`${API_URL}/messages/${message._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: messageStr
      })
      : await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: messageStr
      });
      // listMessages()
      showTable()
    ;
  }

  return {
    message,
    messages,
    createMessage,
    saveMessage,
    deleteMessage,
    getMessage,
    listMessages,
    showTable,
    tableVisible
  }
}