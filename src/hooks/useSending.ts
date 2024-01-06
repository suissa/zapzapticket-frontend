import { useState, MutableRefObject, useRef, useEffect } from "react"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";
import { API_URL } from "../config";
const socket = io(`${API_URL}`);

export default function useSend() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const handleConnect = () => console.log("Conectado ao servidor Socket.io");
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

  // useEffect(() => {
  //   console.log("Estado atualizado da list:", list);

  //   // Registra ouvintes de eventos
  //   const handleMessageSent = (data) => console.log("message:sent eliminar da lista:", data);
  //   const handleMessageReceived = (data) => {
  //     console.log("Mensagem recebida:", data, new Date())
  //     console.log("handleMessageReceived list", list);
  //     // setList(currentList => []);
  //     setList(currentList => currentList.filter(item => item.phone !== data.phone));
  //     console.log("handleMessageReceived depois list", list);
  //   };

  //   socket.on("message:sent", handleMessageSent);
  //   socket.on("message:received", handleMessageReceived);

  //   // Limpa os ouvintes ao desmontar
  //   return () => {
  //     socket.off("connect", handleConnect);
  //     socket.off("message", handleMessage);
  //     socket.off("message:sent", handleMessageSent);
  //     socket.off("message:received", handleMessageReceived);
  //   };
  // }, [list]);

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