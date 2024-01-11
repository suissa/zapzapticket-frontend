import { useState, MutableRefObject, useRef, useEffect } from "react"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";

import { API_URL } from "../config"
const socket = io(API_URL);
const API_URL_MESSAGES = `${API_URL}/contacts/messages`;
const API_URL_STATUS = `${API_URL}/contacts/ticketStatus`;

export default function useKanban() {

  const [list, setList] = useState([]);


  function listTickets() {
    fetch(`${API_URL}`)
      .then(response => response.json())
      .then(data => {
        console.log("listTickets then", data)
        return setList(data)
      })
  }

  function setUpdateTaskStatus(data: any) {
    console.log("useKanban setUpdateTaskStatus data", data)
    // socket.emit("updateTaskStatus", data);
    const { ticketId, ticketStatus } = data;
    const body = { ticketStatus: ticketStatus.toLowerCase() }

    fetch(`${API_URL}/ticketStatus/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        console.log("listTickets then", data)
        return setList(data)
      })
  }
  return {
    list,
    setList,
    listTickets,
    setUpdateTaskStatus
  }
}