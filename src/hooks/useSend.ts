import { useState, MutableRefObject, useRef, useEffect } from "react"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";

const socket = io("http://localhost:9000");
const API_URL = "http://localhost:9000/messages/send/batch";


export default function useContacts() {
  const [sendingsList, setSendingsList] = useState([]);
  
  useEffect(() => {
    // Registra ouvintes de eventos
    const handleConnect = () => console.log("Conectado ao servidor Socket.io");
    const handleMessage = (data) => console.log("Dados recebidos:", data);
    const handleMessageSent = (data) => console.log("message:sent eliminar da lista:", data);
    const handleMessageReceived = (data) => {
      console.log("Mensagem recebida:", data)
      setSendingsList(currentList => [...currentList, data]);
    };

    socket.on("connect", handleConnect);
    socket.on("message", handleMessage);
    socket.on("message:sent", handleMessageSent);
    socket.on("message:received", handleMessageReceived);

    // Limpa os ouvintes ao desmontar
    return () => {
      socket.off("connect", handleConnect);
      socket.off("message", handleMessage);
      socket.off("message:sent", handleMessageSent);
      socket.off("message:received", handleMessageReceived);
    };
  }, []);

  async function sendMessage(list) {
    console.log("sendMessage: ", list)
    return false
    // for (const phone of phones) {
    //   const data = {
    //     "number": phone,
    //     "options": {
    //       "delay": 1200,
    //       "presence": "composing",
    //       "linkPreview": false
    //     },
    //     "textMessage": {
    //       "text": text
    //     }
    //   }
    //   // const jsonStr = JSON.stringify({...data, instaceName});

    //   console.log("data: ", data, `${API_URL}/${instaceName}`);
    // }
    const data = {phones, text, instanceName}
    console.log("data: ", data, `${API_URL}`);
    return await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  }

  return {
    sendMessage,
    sendingsList
  }
}