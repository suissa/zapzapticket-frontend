import { useState } from "react";

export default function useLayout() {
  const [visible, setVisible] = useState<"table" | "form">("table")
  const [isFormOpen, setIsFormOpen] = useState(false)

  const showTable = () => setVisible("table")
  const showForm = () => setVisible("form")

  return {
    tableVisible: visible == "table",
    showTable,
    showForm
  }
}