import { useState, createContext, useRef, useEffect, useCallback } from "react"
import { Contact } from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"
import io from "socket.io-client";
import { API_URL } from "../config"
const socket = io(API_URL);

export default function useTickets() {
  const [contact, setContact] = useState<Contact>(Contact.empty())
  const [contacts, setContacts] = useState<Contact[]>([])


  function sendMessage(data) {
    const { text, phone, instanceName } = data;
    console.log("sendMessage data", data);

    if (!text) {
      console.error("Error sending text: text is empty");
      return;
    }
    if (!phone) {
      console.error("Error sending phone: phone is empty");
      return;
    }
    if (!instanceName) {
      console.error("Error sending instanceName: instanceName is empty");
      return;
    }
    fetch(`${API_URL}/contacts/message/send`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: text, text, phone, instanceName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("then sendMessage data", data);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  }

  const listContacts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/contacts/messages/last/40`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setContacts(data);
      console.log("listContacts data", data);
      return data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
      return [];
      // throw error;
    }
  }, []);

  return {
    sendMessage,
    contact,
    contacts,
    listContacts,
  }
}