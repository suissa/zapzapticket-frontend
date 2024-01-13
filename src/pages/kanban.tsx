import { useEffect, useState } from "react";
import Kanban from "../components/Kanban";
import Menu from '../components/Menu';
import useMessages from "../hooks/useMessagesKanban";
import { useIsAuthenticated } from "../hooks/useAuth";

import useKanban from "../hooks/useKanban";

const API_URL_MESSAGES = `http://localhost:9000/contacts/messages`;

const groupBy = (xs, key) => xs.reduce((rv, x) => ({
  ...rv, [x[key]]: [...(rv[x[key]] || []), x]
}), {});

export default function Home() {
  useIsAuthenticated();


  const [loading, setLoading] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };
  
  const {
    message,
    messages,
    createMessage,
    saveMessage,
    deleteMessage,
    getMessage,
    listMessages,
    showTable,
    tableVisible
  } = useMessages()


  useEffect(() => {
    // console.log("messages", messages);
  }, [messages]); // Dependência do useEffect

  useEffect(() => {
    if (messages) {
      // console.log("messages if:", messages);
    } else {
      // console.log("messages else:", messages);
    }
  }, [messages]); // Dependência do useEffect

 

  return (
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-white p-10">
          {/* <Layout title="Tickets"> */}
            <Kanban
              key={Date.now()}
              list={messages}
            />
          {/* </Layout> */}
        </div>
      </div>
    </div>


  )
}
