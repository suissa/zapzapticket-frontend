import { useState, MutableRefObject, useRef, useEffect } from "react"
import Task from "../core/Task"
import TaskRepository from "../core/TaskRepository"
import useLayout from "./useLayout"

const API_URL = "http://localhost:9000/tasks";

export default function useTasks() {
  const [task, setTask] = useState<Task>(Task.empty())
  const [tasks, setTasks] = useState<Task[]>([])
  const { showForm, showTable, tableVisible } = useLayout()

  useEffect(listTasks, [])

  function createTask() {
    setTask(Task.empty())
    showForm()
  }

  function listTasks() {
    fetch(`${API_URL}/actives`)
      .then(response => response.json())
      .then(data => {
        console.log("listTasks then", data)
        return setTasks(data)
      })
  }

  function getTask(task: Task) {
    setTask(task)
    showForm()
  }

  async function deleteTask(task: Task) {
    listTasks()
  }

  async function saveTask(task: Task) {
    console.log("saveTask task", task)
    const taskStr = task?._id
      ? JSON.stringify({
          _id: task._id,
          text: task.text,
          isActive: task.isActive,
          userEmail: "admin@admin.com",
        })
      : JSON.stringify({
        text: task.text,
        isActive: task.isActive,
        userEmail: "admin@admin.com",
      })
    console.log("saveTask taskStr", taskStr)
    const response = task?._id
      ? await fetch(`${API_URL}/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: taskStr
      })
      : await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: taskStr
      });
      listTasks()
      showTable()
    ;
  }

  function criarTask() {
    setTask(Task.empty())
    showForm()
  }


  return {
    task,
    tasks,
    setTasks,
    createTask,
    saveTask,
    criarTask,
    deleteTask,
    getTask,
    listTasks,
    showTable,
    tableVisible
  }
}