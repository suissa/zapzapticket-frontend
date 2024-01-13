import { useState, MutableRefObject, useRef, useEffect } from "react"
import Tag from "../core/Tag"
import TagRepository from "../core/TagRepository"
import useLayout from "./useLayout"
import useAuth from "./useAuth"
import { API_URL } from "../config"

export default function useTags() {
  const [tag, setTag] = useState<Tag>(Tag.empty())
  const [tags, setTags] = useState<Tag[]>([])
  const { showForm, showTable, tableVisible } = useLayout()
  const { getAuthHeader } = useAuth()

  useEffect(listTags, [])

  function createTag() {
    setTag(Tag.empty())
    showForm()
  }

  function listTags() {
    fetch(`${API_URL}/tags`, {
      headers: getAuthHeader(),
    })
      .then(response => response.json())
      .then(data => {
        console.log("listTags then", data)
        return setTags(data)
      })
  }

  async function listTagsAsync() {
    try {
      const response = await fetch(`${API_URL}/tagas`, {
        headers: getAuthHeader(),
      })
      const data = await response.json()
      console.log("listTags then", data)
      setTags(data)
    } catch (error) {
      console.error("Erro ao listar tags:", error)
    }
  }

  function getTag(tag: Tag) {
    setTag(tag)
    showForm()
  }

  async function deleteTag(tag: Tag) {
    console.log("deleteTag tag", tag)
    const result = await fetch(`${API_URL}/tags/${tag._id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    })
    console.log("deleteTag result", result)
    await listTagsAsync()
    return result
  }

  async function saveTag(tag: Tag) {
    console.log("saveTag tag", tag)
    const tagStr = tag?._id
      ? JSON.stringify({
          _id: tag._id,
          name: tag.name,
          color: tag.color,
        })
      : JSON.stringify({
        name: tag.name,
        color: tag.color,
      })
    console.log("saveTag tagStr", tagStr)
    const response = tag?._id
      ? await fetch(`${API_URL}/tags/${tag._id}`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: tagStr
      })
      : await fetch(`${API_URL}/tags`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: tagStr
      })
      // listTags()
      showTable()
    
  }

  return {
    tag,
    tags,
    createTag,
    saveTag,
    deleteTag,
    getTag,
    listTags,
    showTable,
    tableVisible
  }
}