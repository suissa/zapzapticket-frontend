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

  function onDragEnd(val) {
    // Your version
    // let result = helper.reorder(val.source, val.destination, taskList);
    // setTasks(result);

    /// A different way!
    const { draggableId, source, destination } = val;

    const [sourceGroup] = taskList.filter(
      column => column.groupName === source.droppableId
    );

    // Destination might be `null`: when a task is
    // dropped outside any drop area. In this case the
    // task reamins in the same column so `destination` is same as `source`
    console.log("onDragEnd destination", destination)
    const [destinationGroup] = destination
      ? taskList.filter(column => column.groupName === destination.droppableId)
      : { ...sourceGroup };

    console.log("onDragEnd destinationGroup", destinationGroup)

    setUpdateTaskStatus({
      ticketId: draggableId,
      ticketStatus: destination.droppableId,
    });
    // We save the task we are moving
    const [movingTask] = sourceGroup.tasks.filter(t => t.id === draggableId);
    console.log("onDragEnd movingTask", movingTask)

    const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
    const newDestinationGroupTasks = destinationGroup.tasks.splice(
      destination.index,
      0,
      movingTask
    );

    console.log("onDragEnd newSourceGroupTasks", newSourceGroupTasks)
    console.log("onDragEnd newDestinationGroupTasks", newDestinationGroupTasks)
    // Mapping over the task lists means that you can easily
    // add new columns
    const newTaskList = taskList.map(column => {
      console.log("onDragEnd column", column)
      if (column.groupName === source.groupName) {
        return {
          groupName: column.groupName,
          tasks: newSourceGroupTasks
        };
      }
      if (column.groupName === destination.groupName) {
        return {
          groupName: column.groupName,
          tasks: newDestinationGroupTasks
        };
      }
      return column;
    });
    console.log("onDragEnd newTaskList", newTaskList)
    setTasks(newTaskList);
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