import { io } from "socket.io-client";
import { store } from "../app/store";
//use socketAccessKey created in menuSlice.ts

const url = process.env.NEXT_PUBLIC_PRODUCTION? "https://socketio-797d.onrender.com": "http://localhost:5000";

export const socket = io(url, {
    auth: { accessKey:"123" }
  });
// Export the socket instance

