import { useState, MutableRefObject, useRef, useEffect, useContext } from "react"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
// import io from "socket.io-client";
import { API_URL } from "../config";
// const socket = io(`${API_URL}`);
import { useWebSocket } from "./useWebSocketContext";

export default function useSend() {
  const [list, setList] = useState([]);
  const socket = useWebSocket();

  useEffect(() => {
    const handleConnect = () => console.log("useSendings Conectado ao servidor Socket.io");
    const handleMessage = (data) => console.log("Dados recebidos:", data);
    const handleMessageSent = (phone) => {
      console.log("message:sent eliminar da lista:", phone);
      setList(currentList => currentList.filter(item => item.contact !== phone));
    };

    socket.on("connect", handleConnect);
    socket.on("message", handleMessage);
    socket.on("message:sent", handleMessageSent);

    return () => {
      socket.off("message:sent", handleMessageSent);
    };
  }, []);

  useEffect(() => {
    console.log("Estado atualizado da list:", list);
  }, [list]);

  async function sendMessage(text, phones, instanceName) {
    console.log("sendMessage: list", list);
    const data = {phones, text, instanceName}
    console.log("data: ", data, `${API_URL}/messages/send/batch`);
    return await fetch(`${API_URL}/messages/send/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  }

  return {
    sendMessage,
    list,
    setList
  }
}