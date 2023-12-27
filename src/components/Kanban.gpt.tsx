import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Backlog',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};

export default function KanbanBoard() {
  const [state, setState] = useState(initialData);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
  }



  // {state.columnOrder.map((columnId) => {
  //   console.log('columnId:', columnId);
  //   const column = state.columns[columnId];
  //   const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
  //   console.log('tasks:', tasks)
    // return (
    //   <Droppable droppableId={columnId} key={columnId}>
    //     {(provided) => (
    //       <div
    //         ref={provided.innerRef}
    //         {...provided.droppableProps}
    //       >
    //         {tasks.map((task, index) => (
    //           <Draggable key={task.id} draggableId={task.id} index={index}>
    //             {(provided) => (
    //               <div
    //                 ref={provided.innerRef}
    //                 {...provided.draggableProps}
    //                 {...provided.dragHandleProps}
    //               >
    //                 {task.content}
    //               </div>
    //             )}
    //           </Draggable>
    //         ))}
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>
    // );
  // })}

  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex' }}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          console.log('column:', column);
          const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
          console.log('tasks:', tasks);
          return (
            <div
              key={column.id}
              style={{
                margin: '8px',
                border: '1px solid lightgrey',
                borderRadius: '2px',
                width: '220px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{ padding: '8px' }}>{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                      padding: '8px',
                      flex: 1,
                      minHeight: '100px'
                    }}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: '8px',
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: snapshot.isDragging ? 'lightgreen' : 'grey',
                              color: 'white',
                              ...provided.draggableProps.style
                            }}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
