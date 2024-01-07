import { useState, MutableRefObject, useRef, useEffect } from "react"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";

import { API_URL } from "../config"
const socket = io(API_URL);
const API_URL_MESSAGES = `${API_URL}/contacts/messages`;
const API_URL_STATUS = `${API_URL}/contacts/ticketStatus`;

export default function useSend() {
  const [list, setList] = useState({});


  
  function listTickets() {
    // console.log("useKanban listTickets", data)
    // setList(data)
    // if (callback) callback();
    fetch(`${API_URL_MESSAGES}`)
      .then(response => response.json())
      .then(data => {
        // const lanes = data.slice(0, 1).map((item: any) => {
        //   return {
        //     cards: [
        //       {
        //         description: "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses",
        //         id: "Wip1",
        //         label: "30 mins",
        //         laneId: "WIP",
        //         title: "Clean House"
        //       }
        //     ],
        //     currentPage: 1,
        //     id: "WIP",
        //     label: "10/20",
        //     style: {
        //       width: 280
        //     },
        //     title: "Work In Progress"
        //   }
        // });
        // console.log("listTickets then", {lanes})
        const list = {
          lanes: [
            {
              id: 'lane1',
              title: 'Planned Tasks',
              label: '2/2',
              cards: [
                {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
                {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
              ]
            },
            {
              id: 'lane2',
              title: 'Completed',
              label: '0/0',
              cards: []
            }
          ]
        }
        return setList(list)
      })
  }

  function setUpdateTaskStatus(data: any) {
    console.log("useKanban setUpdateTaskStatus data", data)
    // socket.emit("updateTaskStatus", data);
    const { ticketId, ticketStatus } = data;
    const body = { ticketStatus: ticketStatus.toLowerCase() }

    fetch(`${API_URL_STATUS}/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      // .then(data => {
      //   console.log("listTickets then", data)
      //   setList(data)
      //   console.log("listTickets then", list)
      // })
  }
  return {
    list,
    setList,
    listTickets,
    setUpdateTaskStatus
  }
}