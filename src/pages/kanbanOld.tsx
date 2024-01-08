import { useEffect, useState } from "react";
import Kanban from "../components/Kanban";
import Menu from "../components/Menu";
import useKanban from "../hooks/useKanban";


const API_URL_MESSAGES = `http://localhost:9000/contacts/messages`;

const groupBy = (xs, key) => xs.reduce((rv, x) => ({
  ...rv, [x[key]]: [...(rv[x[key]] || []), x]
}), {});

export default function Home() {
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

  // {
  //   "_id": "658a3a22df7a6f516df5dbac",
  //   "name": "5511994649923",
  //   "phone": "5511994649923",
  //   "status": "Lista fria",
  //   "city": "Sao Paulo",
  //   "state": "SP",
  //   "country": "Brasil",
  //   "ticketStatus": "inativo",
  //   "badges": [
  //     "teste",
  //     "marotinho",
  //     "lead quente"
  //   ],
  //   "messages": [
  //     {
  //       "type": "sent",
  //       "typeMessage": "text",
  //       "text": "teste",
  //       "createdAt": "2024-01-05T05:08:43.439Z",
  //       "phone": "5511978210616"
  //     }
  //   ],
  //   "createdAt": "2023-12-26T02:27:46.235Z",
  //   "updatedAt": "2024-01-05T05:08:43.441Z",
  //   "__v": 30,
  //   "profilePictureUrl": "/images/avatar-01.png"
  // }
  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Planned Tasks',
        label: '2/2',
        cards: [
          {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
          {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
        ]
      },
      {
        id: 'lane2',
        title: 'Completed',
        label: '0/0',
        cards: []
      }
    ]
  }
  useEffect(() => {
    fetch(`${API_URL_MESSAGES}`)
      .then(response => response.json())
      .then(_data => {
        // return setList(data)
          // const lanes = Object.values(groupBy(
          //   data.map((item: any, i: number) => {

          //     const obj = {
          //       id: `lane${i}`,
          //       title: item.ticketStatus,
          //       label: "2/2",
          //       cards: [
          //         {id: `Card${i}`, title: "Write Blog", description: "Can AI make memes", label: "30 mins", draggable: false},
          //         {id: `Card${i+1}`, title: "Pay Rent", description: "Transfer via NEFT", label: "5 mins", metadata: {sha: "be312a1"}}
          //       ]
          //     }
          //   return obj
          //   //   cards: [
          //   //     {
          //   //       description: "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses",
          //   //       id: "Wip1",
          //   //       label: "30 mins",
          //   //       laneId: "WIP",
          //   //       title: "Clean House"
          //   //     }
          //   //   ],
          //   //   currentPage: 1,
          //   //   id: "WIP",
          //   //   label: "10/20",
          //   //   style: {
          //   //     width: 280
          //   //   },
          //   //   title: "Work In Progress"
          //   // }
          // }), "ticketStatus"))
          // // console.log("listTickets then", {lanes})
          
          // console.log("listTickets then", data)
          return setList(data)
        })
        .catch(error => {
          console.error("Erro em listTickets:", error);
        });

        setList(data)
  }, []);
  

  useEffect(() => {
    if (list) {
      // console.log("list if:", list);
    } else {
      // console.log("list else:", list);
    }
  }, [list]); // Dependência do useEffect

 

  return (
    <>
    {// console.log("list return :", list)}
    <div className="flex">
      <Menu onToggle={setIsSidebarExpanded} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? "ml-64" : "ml-10"}`}>
        <div className="h-screen bg text-white p-10">
          {list && <Kanban
            key={Date.now()}
            list={list}
          />}
        </div>
      </div>
    </div>
    </>
  )
}
