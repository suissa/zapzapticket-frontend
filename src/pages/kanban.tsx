import { useEffect, useState } from "react";
import Kanban from "../components/Kanban";
import Menu from '../components/Menu';
import useKanban from "../hooks/useKanban";

export default function Home() {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();
  const [selectedConnection, setSelectedConnection] = useState();
  const [loading, setLoading] = useState(false);

  const {
    list,
    setList,
    listTickets
  } = useKanban()

  useEffect(() => {
    listTickets();
    console.log("kanban page list", list);
  }, []);

  useEffect(() => {
    if (list) {
      console.log('list if:', list);
    } else {
      console.log('list else:', list);
    }
  }, [list]); // Dependência do useEffect

  return (
    <div>
      <Menu />
      <div className={`flex justify-center items-top h-screen bg text-white`}>
        <Kanban
          list={list}
        />
      </div>
    </div>
  )
}
