import { useState, useRef } from "react"
import useAuth from "./useAuth"
import { API_URL } from "../config"

export default function useHandleInstanceStatusCheckboxChange() {
  const [qrCodeBase64, setQrCodeBase64] = useState("")
  console.log("API_URL:", API_URL)
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false)
  const [currentConnection, setCurrentConnection] = useState(null)
  const { getAuthHeader } = useAuth()

  const openQRCodeModal = () => {
    setIsQRCodeModalOpen(true)
  }

  const closeQRCodeModal = () => {
    setIsQRCodeModalOpen(false)
  }

  // const QRCODE = "data:image/pngbase64,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"
  const handleInstanceStatusCheckboxChange = async (connection) => {

    setCurrentConnection(connection)

    console.log("handleIntanceStatusCheckboxChange connection.instanceStatus:", connection.instanceStatus)
    console.log("API_URL dentro da função:", API_URL)

    // tirar implementacao daqui
    if (!connection.instanceStatus) {
      console.log(connection._id)
      const url = `${API_URL}/connections/${connection._id}`
      console.log(url)
      const result = await fetch(url, {
        method: "GET",
        headers: getAuthHeader(),
      })
      console.log(result)
      const connectionAPI = await result.json()
      console.log(connectionAPI)
  
      // return false
      const instanceName = connectionAPI.name.replace(" ", "_") + "-" + connectionAPI.phone
      console.log(instanceName)
      const data = {
        instanceName: instanceName,
        token: "tokenMaroto_872983_" + Date.now(),
        qrcode: true
      }
      const urlCreate = `${API_URL}/evolution/instances`
      const dataBody = {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(data)
      }
  
      console.log({urlCreate, dataBody})
      openQRCodeModal()
      // return true
      const resultUpdate = await fetch(urlCreate, dataBody)
      const connectionSaved = await resultUpdate.json()
      console.log(connectionSaved)
      console.log("QRCODE: ", connectionSaved?.qrcode?.base64)
      if (connectionSaved?.qrcode?.base64) {
        setQrCodeBase64(connectionSaved.qrcode.base64)
      } else {
        console.log("caiu no else")
        alert("Problema na conexão")
      }
  
    } else {
      console.log("caiu no else")
      connection.isActive = !connection.isActive
      // atualiza pra connection.instanceStatus false
      // connectionSaved(connection)
  
      const response = await fetch(`${API_URL}/connections/shutdown/${connection.instanceName}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      })
      const resultDelete = await response.json()

      console.log(resultDelete)
    }
  }

  return { qrCodeBase64, isQRCodeModalOpen, openQRCodeModal, closeQRCodeModal, handleInstanceStatusCheckboxChange, currentConnection }
}
