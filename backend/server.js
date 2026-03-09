const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin:"*"
  }
})

const rooms = {}

io.on("connection",(socket)=>{

  console.log("User connected",socket.id)

  socket.on("join-room",({roomId,username})=>{

    socket.join(roomId)

    if(!rooms[roomId]){
      rooms[roomId] = []
    }

    let role = "participant"

    if(rooms[roomId].length === 0){
      role = "host"
    }
    else if(rooms[roomId].length === 1){
      role = "moderator"
    }

    const user = {
      id: socket.id,
      name: username,
      role: role
    }

    rooms[roomId].push(user)

    io.to(roomId).emit("participants",rooms[roomId])
  })

  socket.on("play",({roomId})=>{
    socket.to(roomId).emit("play")
  })

  socket.on("pause",({roomId})=>{
    socket.to(roomId).emit("pause")
  })

  socket.on("change-video",({roomId,videoId})=>{
    io.to(roomId).emit("change-video",{videoId})
  })

})

server.listen(3000,()=>{
  console.log("Server running on port 3000")
})