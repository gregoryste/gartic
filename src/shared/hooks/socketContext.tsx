import React from "react";
import { SocketContext, socket } from '../hooks/context/socket';

interface Props {
    children: React.ReactNode;
}

export const SocketConext: React.FC<Props> = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};