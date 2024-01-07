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
        const lanes = [ ...Object.entries(groupBy(data, 'ticketStatus')).map(([key, value], i) => {
          console.log("listMessages then key", key)
          console.log("listMessages then value", value)
          return {
            id: "lane"+i,
            title: key,
            label: `${value.length}/${value.length}`,
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
        const _lanes = [{
          cards: [
            {
              description: "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses",
              id: "Wip1",
              label: "30 mins",
              laneId: "WIP",
              title: "Clean House"
            }
          ],
          currentPage: 1,
          id: "WIP",
          label: "10/20",
          style: {
            width: 280
          },
          title: "Work In Progress"
        },]
        const obj = { lanes }
        console.log("listMessages then _lanes", _lanes)
        console.log("listMessages then obj", obj)
        const list = {lanes: [
          {
            cards: [
              {
                description: "2 Gallons of milk at the Deli store",
                id: "Milk",
                label: "15 mins",
                laneId: "PLANNED",
                title: "Buy milk"
              },
              {
                description: "Sort out recyclable and waste as needed",
                id: "Plan2",
                label: "10 mins",
                laneId: "PLANNED",
                title: "Dispose Garbage"
              },
              {
                description: "Can AI make memes?",
                id: "Plan3",
                label: "30 mins",
                laneId: "PLANNED",
                title: "Write Blog"
              },
              {
                description: "Transfer to bank account",
                id: "Plan4",
                label: "5 mins",
                laneId: "PLANNED",
                title: "Pay Rent"
              }
            ],
            currentPage: 1,
            disallowAddingCard: true,
            id: "PLANNED",
            label: "20/70",
            style: {
              width: 280
            },
            title: "Disallowed adding card"
          },
          {
            cards: [
              {
                description: "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses",
                id: "Wip1",
                label: "30 mins",
                laneId: "WIP",
                title: "Clean House"
              }
            ],
            currentPage: 1,
            id: "WIP",
            label: "10/20",
            style: {
              width: 280
            },
            title: "Work In Progress"
          },
          {
            cards: [],
            currentPage: 1,
            id: "BLOCKED",
            label: "0/0",
            style: {
              width: 280
            },
            title: "Blocked"
          },
          {
            cards: [
              {
                description: "Use Headspace app",
                id: "Completed1",
                label: "15 mins",
                laneId: "COMPLETED",
                title: "Practice Meditation"
              },
              {
                description: "Use Spreadsheet for now",
                id: "Completed2",
                label: "15 mins",
                laneId: "COMPLETED",
                title: "Maintain Daily Journal"
              }
            ],
            currentPage: 1,
            id: "COMPLETED",
            label: "2/5",
            style: {
              width: 280
            },
            title: "Completed"
          },
          {
            cards: [
              {
                description: "Track using fitbit",
                id: "Repeat1",
                label: "30 mins",
                laneId: "REPEAT",
                title: "Morning Jog"
              }
            ],
            currentPage: 1,
            id: "REPEAT",
            label: "1/1",
            style: {
              width: 280
            },
            title: "Repeat"
          },
          {
            cards: [
              {
                description: "Completed 10km on cycle",
                id: "Archived1",
                label: "300 mins",
                laneId: "ARCHIVED",
                title: "Go Trekking"
              }
            ],
            currentPage: 1,
            id: "ARCHIVED",
            label: "1/1",
            style: {
              width: 280
            },
            title: "Archived"
          },
          {
            cards: [
              {
                description: "Completed 10km on cycle",
                id: "Archived2",
                label: "300 mins",
                laneId: "ARCHIVED2",
                title: "Go Jogging"
              }
            ],
            currentPage: 1,
            id: "ARCHIVED2",
            label: "1/1",
            style: {
              width: 280
            },
            title: "Archived2"
          },
          {
            cards: [
              {
                description: "Completed 10km on cycle",
                id: "Archived3",
                label: "300 mins",
                laneId: "ARCHIVED3",
                title: "Go Cycling"
              }
            ],
            currentPage: 1,
            id: "ARCHIVED3",
            label: "1/1",
            style: {
              width: 280
            },
            title: "Archived3"
          }
        ]
        }
        console.log("listMessages then list", list)
        return setMessages(obj)
      })
      // .then(data => {
      //   console.log("listMessages then", data)
      //   return setMessages( {
      //     lanes: [
      //       {
      //         id: 'lane1',
      //         title: 'Planned Tasks',
      //         label: '2/2',
      //         cards: [
      //           {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
      //           {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
      //         ]
      //       },
      //       {
      //         id: 'lane2',
      //         title: 'Completed',
      //         label: '0/0',
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
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: messageStr
      })
      : await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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