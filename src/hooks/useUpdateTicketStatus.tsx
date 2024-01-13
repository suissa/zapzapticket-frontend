import { useState } from "react"
import useAuth from "./useAuth"
import { API_URL } from "../config"

const useUpdateTicketStatus = (contactId) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { getAuthHeader } = useAuth()

  const updateTicketStatus = async (id, newStatus) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/tickets/accept/${id}`, {
        method: "PUT", // ou PUT
        headers: getAuthHeader(),
        body: JSON.stringify({ status: "accept" }),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar o status do ticket")
      }

      const data = await response.json()
      setIsLoading(false)
      return data

    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  return { updateTicketStatus, isLoading, error }
}

export default useUpdateTicketStatus
