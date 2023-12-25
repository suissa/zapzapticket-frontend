import { useState, MutableRefObject, useRef, useEffect } from "react"
import User from "../core/User"
import Button from "./Button"
import { IconEdit, IconThrash } from "./Icons"

interface TableProps {
  list: string[];
  connection: string;
  message: string;
}

export default function Table({ list }: TableProps) {
  const [checked, setChecked] = useState(false);
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4 w-1/6">Enviador</th>
        <th className="text-left p-4 w-1/6">Recebedor</th>
        <th className="text-left p-4 w-1/8">Mensagem</th>
      </tr>
    )
  }

  function renderData() {
    console.log("renderData: ", list)
    return list?.map(({connection, contact, message}, i) => {
      return (
        <tr key={contact} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className="text-left p-4 w-1/6">{connection.split("-")[0].replace("_", " ")}</td>
          <td className="text-left p-4 w-1/6">{contact}</td>
          <td className="text-left p-4 w-1/6">{message}</td>
        </tr>
      )
    })
  }
  return (
    <div>
      <table className="w-full rounded-xl overflow-hidden table-fixed">
        <thead className={`
            text-gray-100
            bg-gradient-to-r from-purple-500 to-purple-800
        `}>
          {renderHeader()}
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
    </div>
  )
}