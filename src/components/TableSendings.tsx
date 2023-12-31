interface TableProps {
  list: string[];
  connection: string;
  message: string;
}

export default function Table({ list }: TableProps) {

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4 w-1/6">Enviador</th>
        <th className="text-left p-4 w-1/6">Recebedor</th>
      </tr>
    )
  }

  function renderData() {
    console.log("renderData TableSendings: ", list)
    return list?.map(({connection, contact, message}, i) => {
      return (
        <tr key={contact} className={`text-black ${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}>
          <td className="text-left p-4 w-1/6">{connection.split("-")[0].replace("_", " ")}</td>
          <td className="text-left p-4 w-1/6">{contact}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      <table className="w-full rounded-md overflow-hidden table-fixed">
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