import React, { createContext, useState, useEffect } from 'react';
import socketio from "socket.io-client";
import { Environment } from "../../../shared/environment";

export const socket = socketio.connect(Environment.socketIo);
export const SocketContext = React.createContext();