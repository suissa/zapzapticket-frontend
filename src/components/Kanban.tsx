import React, { useState, useEffect } from "react";
import useKanban from "../hooks/useKanban";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dynamic from 'next/dynamic';

const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.DragDropContext;
    }),
  {ssr: false},
);
const Droppable = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Droppable;
    }),
  {ssr: false},
);
const Draggable = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Draggable;
    }),
  {ssr: false},
);
import Column from "./Column";

function Kanban({ list }) {

  const [taskList, setTasks] = useState(transformList(list));

  function transformList(list) {
    const todoList = list
      .filter((item) =>
        item.ticketStatus.toLowerCase() === "inativo" || item.ticketStatus.toLowerCase() === "to do"
      )
      .map((item) => ({
        id: item._id,
        title: `${item.name ? item.name : "Não informado"}`,
        content: `${item.messages[0] ? item.messages[0].text : "Não informado"}`,
      }));

    const doingList = list
      .filter((item) => item.ticketStatus.toLowerCase() === "doing")
      .map((item) => ({
        id: item._id,
        title: `${item.name ? item.name : "Não informado"}`,
        content: `${item.messages[0] ? item.messages[0].text : "Não informado"}`,
      }));

    const doneList = list
    .filter((item) => item.ticketStatus.toLowerCase() === "done")
    .map((item) => ({
      id: item._id,
      title: `${item.name ? item.name : "Não informado"}`,
      content: `${item.messages[0] ? item.messages[0].text : "Não informado"}`,
    }));

    return [
      { groupName: "To Do", tasks: todoList },
      { groupName: "Doing", tasks: doingList },
      { groupName: "Done", tasks: doneList },
    ];
  };


  useEffect(() => {
    setTasks(transformList(list));
  }, [list]);

  const { setUpdateTaskStatus } = useKanban();

  // function onDragEnd(val) {
  //   // Your version
  //   // let result = helper.reorder(val.source, val.destination, taskList);
  //   // setTasks(result);

  //   /// A different way!
  //   const { draggableId, source, destination } = val;

  //   const [sourceGroup] = taskList.filter(
  //     column => column.groupName === source.droppableId
  //   );

  //   // Destination might be `null`: when a task is
  //   // dropped outside any drop area. In this case the
  //   // task reamins in the same column so `destination` is same as `source`
  //   console.log("onDragEnd destination", destination)
  //   const [destinationGroup] = destination
  //     ? taskList.filter(column => column.groupName === destination.droppableId)
  //     : [{ ...sourceGroup }];

  //   console.log("onDragEnd destinationGroup", destinationGroup)

  //   setUpdateTaskStatus({
  //     ticketId: draggableId,
  //     ticketStatus: destination.droppableId,
  //   });
  //   // We save the task we are moving
  //   const [movingTask] = sourceGroup.tasks.filter(t => t.id === draggableId);
  //   console.log("onDragEnd movingTask", movingTask)

  //   const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
  //   const newDestinationGroupTasks = destinationGroup.tasks.splice(
  //     destination.index,
  //     0,
  //     movingTask
  //   );

  //   console.log("onDragEnd newSourceGroupTasks", newSourceGroupTasks)
  //   console.log("onDragEnd newDestinationGroupTasks", newDestinationGroupTasks)
  //   // Mapping over the task lists means that you can easily
  //   // add new columns
  //   const newTaskList = taskList.map(column => {
  //     console.log("onDragEnd column", column)
  //     if (column.groupName === source.groupName) {
  //       return {
  //         groupName: column.groupName,
  //         tasks: newSourceGroupTasks
  //       };
  //     }
  //     if (column.groupName === destination.groupName) {
  //       return {
  //         groupName: column.groupName,
  //         tasks: newDestinationGroupTasks
  //       };
  //     }
  //     return column;
  //   });
  //   console.log("onDragEnd newTaskList", newTaskList)
  //   setTasks(newTaskList);
  // }

  // code by gpt
  function onDragEnd(val) {
    const { draggableId, source, destination } = val;
  
    // Se não há destino, não faça nada
    if (!destination) return;
  
    // Se a origem e o destino são os mesmos (mesma coluna e mesma posição), não faça nada
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    // Encontrar a coluna de origem e de destino
    const sourceColumn = taskList.find(column => column.groupName === source.droppableId);
    const destinationColumn = taskList.find(column => column.groupName === destination.droppableId);
  
    // Clonar os arrays de tarefas das colunas de origem e destino
    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = destinationColumn.groupName === sourceColumn.groupName
      ? sourceTasks
      : [...destinationColumn.tasks];
  
    // Mover a tarefa da origem para o destino
    const [removed] = sourceTasks.splice(source.index, 1);
    destinationTasks.splice(destination.index, 0, removed);
  
    // Criar um novo array de colunas com as tarefas atualizadas
    const newTaskList = taskList.map(column => {
      if (column.groupName === sourceColumn.groupName) {
        return { ...column, tasks: sourceTasks };
      } else if (column.groupName === destinationColumn.groupName) {
        return { ...column, tasks: destinationTasks };
      }
      return column;
    });
  
    setTasks(newTaskList);
  
    // Atualize o status da tarefa, se necessário
    setUpdateTaskStatus({
      ticketId: draggableId,
      ticketStatus: destination.droppableId,
    });
  }
  

  return (
    <div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Column
            className="column"
            droppableId="To Do"
            list={taskList[0].tasks}
            type="TASK"
          />
          <Column
            className="column"
            droppableId="Doing"
            list={taskList[1].tasks}
            type="TASK"
          />
          <Column
            className="column"
            droppableId="Done"
            list={taskList[2].tasks}
            type="TASK"
          />
        </div>
      </DragDropContext>
    </div>
  );
}

export default Kanban;