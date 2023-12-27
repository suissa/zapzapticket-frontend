import React, { useState } from "react";
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

function App() {
  let initialState = [
    {
      groupName: "To Do",
      tasks: [{ id: "1", title: "Test-1" }, { id: "2", title: "Test-2" }]
    },
    {
      groupName: "Doing",
      tasks: [{ id: "3", title: "Test-3" }, { id: "4", title: "Test-4" }]
    },
    {
      groupName: "Done",
      tasks: [{ id: "5", title: "Test-5" }]
    }
  ];

  const [taskList, setTasks] = useState(initialState);

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
    const [destinationGroup] = destination
      ? taskList.filter(column => column.groupName === destination.droppableId)
      : { ...sourceGroup };

    // We save the task we are moving
    const [movingTask] = sourceGroup.tasks.filter(t => t.id === draggableId);

    const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
    const newDestinationGroupTasks = destinationGroup.tasks.splice(
      destination.index,
      0,
      movingTask
    );

    // Mapping over the task lists means that you can easily
    // add new columns
    const newTaskList = taskList.map(column => {
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

export default App;