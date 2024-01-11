import { useState } from "react";
import { API_URL } from "../config";

const useUpdateTicketStatus = (contactId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateTicketStatus = async (id, newStatus) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/tickets/accept/${id}`, {
        method: "PUT", // ou PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "accept" }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar o status do ticket");
      }

      const data = await response.json();
      setIsLoading(false);
      return data;

    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return { updateTicketStatus, isLoading, error };
};

export default useUpdateTicketStatus;
