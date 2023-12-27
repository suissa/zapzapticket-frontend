import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

function Column(props) {
  const { droppableId, list, type } = props;

  return (
    <Droppable droppableId={droppableId} type={type} key={droppableId}>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef} className="kanbanColumn">
          <h2 className="mb-4">{droppableId}</h2>

          {list.map((val, index) => {
            return (
              <Task id={val.id} key={val.id} index={index} title={val.title} content={val.content} />
            );
          })}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column;
