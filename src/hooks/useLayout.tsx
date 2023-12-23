import { useState } from "react";

export default function useLayout() {
  const [visible, setVisible] = useState<'table' | 'form'>('table')

  const showTable = () => setVisible('table')
  const showForm = () => setVisible('form')

  return {
    tableVisible: visible == 'table',
    showTable,
    showForm
  }
}