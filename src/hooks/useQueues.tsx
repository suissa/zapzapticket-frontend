import { useState, MutableRefObject, useRef, useEffect } from "react";
import Queue from "../core/Queue";
// import QueueRepository from "../core/QueueRepository";
import useLayout from "./useLayout";
import useAuth from "./useAuth"
import { API_URL } from "../config";

export default function useQueues() {
  const [queue, setQueue] = useState<Queue>(Queue.empty())
  const [queues, setQueues] = useState<Queue[]>([])
  const { showForm, showTable, tableVisible } = useLayout()
  const { getAuthHeader } = useAuth()

  useEffect(listQueues, [])

  function createQueue() {
    setQueue(Queue.empty())
    showForm()
  }

  function listQueues() {
    fetch(`${API_URL}/queues`,
    {
      headers: getAuthHeader(),
    })
      .then(response => response.json())
      .then(data => {
        console.log("listQueues then", data)
        return setQueues(data)
      })
  }

  async function listQueuesAsync() {
    try {
      const response = await fetch(`${API_URL}/queues`,
      {
        headers: getAuthHeader(),
      });
      const data = await response.json();
      console.log("listQueues then", data);
      setQueues(data);
    } catch (error) {
      console.error("Erro ao listar queues:", error);
    }
  }

  function getQueue(queue: Queue) {
    setQueue(queue)
    showForm()
  }

  async function deleteQueue(queue: Queue) {
    console.log("deleteQueue queue", queue)
    const result = await fetch(`${API_URL}/queues/${queue._id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    })
    console.log("deleteQueue result", result)
    await listQueuesAsync()
    return result;
  }

  async function saveQueue(queue: Queue) {
    console.log("saveQueue queue", queue)
    const queueStr = queue?._id
      ? JSON.stringify({
          _id: queue._id,
          name: queue.name,
          color: queue.color,
        })
      : JSON.stringify({
        name: queue.name,
        color: queue.color,
        adminEmail: "admin@admin.com",
      })
    console.log("saveQueue queueStr", queueStr)
    const response = queue?._id
      ? await fetch(`${API_URL}/queues/${queue._id}`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: queueStr
      })
      : await fetch(`${API_URL}/queues`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: queueStr
      });
      // listQueues()
      showTable()
    ;
  }

  return {
    queue,
    queues,
    createQueue,
    saveQueue,
    deleteQueue,
    getQueue,
    setQueues,
    listQueues,
    showTable,
    tableVisible
  }
}