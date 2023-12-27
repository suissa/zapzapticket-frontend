import { useEffect, useState } from "react";
import Button from "../components/Button";
import FormContact from "../components/FormContact";
import Layout from "../components/Layout";
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


  // useEffect(() => {
  //   if (tableVisible) {
  //     // Chame a função listTickets quando tableVisible mudar
  //     listTickets();
  //   }
  // }, [tableVisible]); // O segundo argumento é um array de dependências

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
      <div className={`flex justify-center items-center h-screen bg text-white`}>
        <Kanban
          list={list}
        />
      </div>
    </div>
  )
}
