import React, { useState, useEffect } from "react";
import Board from "react-trello"
import useKanban from "../hooks/useKanban";

const { setUpdateTaskStatus } = useKanban();

function handleDragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails) {
  console.log(`Card with ID: ${cardId} was moved from ${sourceLaneId} to ${targetLaneId} at position ${position}`);
  const ticketId = cardId
  const  ticketStatus = targetLaneId ;
  const data = { ticketId, ticketStatus };
  console.log("data", data);
  setUpdateTaskStatus(data);
}

  function Kanban({list}) {
    console.log("Kanban list", list);
    return list && 
    <Board 
      data={list} 
      style={{backgroundColor: "transparent"}}
      handleDragEnd={handleDragEnd} 
    />
  }
  

export default Kanban;