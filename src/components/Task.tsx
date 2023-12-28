import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Task(props) {
  const { id, index, title, content } = props;
  // console.log("Task component props", props);

  return (
    <Draggable draggableId={id} index={index} type="TASK">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            zIndex: snapshot.isDragging ? 999999 : 'auto',
            // Resto do seu estilo aqui
          }}
        >
          <div className="p-2 mb-2 task bg-gradient-to-r from-purple-500 to-purple-800">

            <h4>{title}</h4>
            <p className="task-content">{content}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
