import { io } from "socket.io-client"

const URL = "https://watch-party-app-1-n2qm.onrender.com"

export const socket = io(URL, {
  transports: ["websocket", "polling"]
})