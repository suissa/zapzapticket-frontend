import { useState, MutableRefObject, useRef, useEffect } from "react"
import { Contact } from "../core/Contact"
import ContactRepository from "../core/ContactRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000/evolution/messages/send";

export default function useContacts() {

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
      await fetch(`${API_URL}/${instaceName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    }
  }

  return {
    sendMessage
  }
}