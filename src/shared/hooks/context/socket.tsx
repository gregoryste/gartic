import React from 'react';
import * as io from "socket.io-client";
import { Environment } from "../../../shared/environment";

export const socket = io.connect(Environment.socketIo);
export const SocketContext = React.createContext(null);