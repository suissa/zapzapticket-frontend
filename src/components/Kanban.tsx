import React, { useState, useEffect } from "react";
import Board from 'react-trello'

// import Trello from "../components/Trello";
import useKanban from "../hooks/useKanban";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";

  
  function Kanban({list}) {
    console.log('Kanban list', list);
    return list && <Board data={list} />
  }
  

export default Kanban;