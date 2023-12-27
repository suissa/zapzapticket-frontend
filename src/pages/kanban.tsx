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

  const handleSendMessage = async () => {
    setLoading(true);

    if (selectedMessage && selectedConnection) {
      try {
        // Use selectedContacts diretamente
        if (selectedContacts.length > 0) {
          console.log('selectedContacts:', selectedContacts);
          // const newContacts = selectedContacts.filter(contact =>
          //   !list.some(item => item.contact === contact)
          // );
          // console.log('newContacts:', newContacts);
          const newEntries = selectedContacts.map(contact => ({
            connection: selectedConnection,
            contact: contact,
            message: selectedMessage
          }));

          console.log('list:', list);
          console.log('newEntries:', newEntries);
          setList([...list, ...newEntries]);

          console.log('sendingsList:', selectedMessage);
          await sendMessage(selectedMessage, selectedContacts, selectedConnection);
        } else {
          // Trate o caso em que nenhum contato foi selecionado
          alert("Nenhum contato selecionado.");
        }
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Parâmetros incompletos para o envio.");
      setLoading(false);
    }
  };

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
