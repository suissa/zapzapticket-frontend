import { useState, MutableRefObject, useRef, useEffect } from "react"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";

const socket = io("http://localhost:9000");
const API_URL = "http://localhost:9000/evolution/messages/send";

export default function useContacts() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado ao servidor Socket.io");
    });

    socket.on("message", (data) => {
      console.log("Dados recebidos:", data);
    });

    socket.emit("message", ()=> {
      console.log("Dados enviados do front:");
      return "Dados enviados do front:"
    });
    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  async function sendMessage(text, phones, instaceName) {
    for (const phone of phones) {
      const data = {
        "number": phone,
        "options": {
          "delay": 1200,
          "presence": "composing",
          "linkPreview": false
        },
        "textMessage": {
          "text": text
        }
      }
      console.log("data: ", data, `${API_URL}/${instaceName}`);
      await fetch(`${API_URL}/${instaceName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
    }
  }

  return {
    sendMessage
  }
}