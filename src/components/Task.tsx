import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Task(props) {
  const { id, index, title } = props;
  let style = {
    backgroundColor: "purple"
  };

  return (
    <Draggable draggableId={id} index={index} type="TASK">
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 style={style} className="bg-gradient-to-r from-purple-500 to-purple-800 p-4 mb-2">{title}</h4>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
