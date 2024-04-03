import { io } from "socket.io-client";

const socketEnvironment = {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 500,
  randomizationFactor: 0.5,
  transports: ["websocket"],
};

const socket = io("http://localhost:8000", socketEnvironment);

export { socket };
