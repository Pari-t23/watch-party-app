const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const socketHandler = require("./socketHandler")

const app = express()
const server = http.createServer(app)

// socket server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// socket logic
socketHandler(io)

// Render dynamic port
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})