import { useEffect, useState } from "react";
import Kanban from "../components/Kanban";
import Menu from '../components/Menu';
import useKanban from "../hooks/useKanban";

export default function Home() {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();
  const [selectedConnection, setSelectedConnection] = useState();
  const [loading, setLoading] = useState(false);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };
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
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-white p-10">
          <Kanban
            list={list}
          />
        </div>
      </div>
    </div>
  )
}
