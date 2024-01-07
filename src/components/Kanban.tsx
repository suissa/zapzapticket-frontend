import React, { useState, useEffect } from "react";
import Board from "react-trello"
import styled, {createGlobalStyle} from 'styled-components';

// Exemplo de um estilo global
const MyGlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
  }
  // outros estilos globais
`;

// Exemplo de componente de cabeçalho de Lane personalizado
const MyLaneHeader = styled.div`
  background-color: navy;
  color: white;
  padding: 10px;
  // outros estilos
`;

// Exemplo de componente de Cartão personalizado
const MyCard = styled.div`
  border: 1px solid #eee;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  // outros estilos
`;

// Exemplo de componente para adicionar link de cartão
const MyAddCardLink = styled.a`
  color: green;
  // outros estilos
`;

const components = {
  GlobalStyle: MyGlobalStyle,
  LaneHeader: MyLaneHeader,
  Card: MyCard,
  AddCardLink: MyAddCardLink,
  // outros componentes personalizados
};
// import Trello from "../components/Trello";
import useKanban from "../hooks/useKanban";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";

  function Kanban({list}) {
    // console.log("Kanban list", list);
    // return <Board data={list} components={components} />

    return list && <Board data={list}
    style={{backgroundColor: "transparent"}} />
  }


export default Kanban;