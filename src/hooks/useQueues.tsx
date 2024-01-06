import { useState, MutableRefObject, useRef, useEffect } from "react";
import Queue from "../core/Queue";
// import QueueRepository from "../core/QueueRepository";
import useLayout from "./useLayout";
import { API_URL } from "../config";

export default function useQueues() {
  const [queue, setQueue] = useState<Queue>(Queue.empty())
  const [queues, setQueues] = useState<Queue[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listQueues, [])

  function createQueue() {
    setQueue(Queue.empty())
    showForm()
  }

  function listQueues() {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log("listQueues then", data)
        return setQueues(data)
      })
  }

  async function listQueuesAsync() {
    try {
      const response = await fetch(API_URL);
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
      headers: { 'Content-Type': 'application/json' },
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
      })
    console.log("saveQueue queueStr", queueStr)
    const response = queue?._id
      ? await fetch(`${API_URL}/queues/${queue._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: queueStr
      })
      : await fetch(`${API_URL}/queues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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