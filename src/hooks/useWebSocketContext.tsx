import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";
const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(API_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
