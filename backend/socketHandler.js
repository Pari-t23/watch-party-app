const { createRoom, joinRoom, getUsers, getUser, promoteUser } = require("./roomManager")

function socketHandler(io){

  io.on("connection",(socket)=>{

    console.log("User connected:",socket.id)

    // CREATE ROOM
    socket.on("create_room",({roomId, username})=>{

      createRoom(roomId, socket.id, username)

      socket.join(roomId)

      io.to(roomId).emit("participants", getUsers(roomId))

    })


    // JOIN ROOM
    socket.on("join_room",({roomId, username})=>{

      joinRoom(roomId, socket.id, username)

      socket.join(roomId)

      io.to(roomId).emit("participants", getUsers(roomId))

    })


    // PLAY VIDEO (Host / Moderator)
    socket.on("play", ({ roomId }) => {

      const users = getUsers(roomId)
        const user = users.find(u => u.socketId === socket.id)

         if (user.role === "host" || user.role === "moderator") {
          socket.to(roomId).emit("play")
        }

    })
    
    //PAUSE VIDEO (Host / Moderator)
    socket.on("pause", ({ roomId }) => {

      const users = getUsers(roomId)
       const user = users.find(u => u.socketId === socket.id)

         if (user.role === "host" || user.role === "moderator") {
          socket.to(roomId).emit("pause")
        }

    })


    // SEEK VIDEO (Host / Moderator)
    socket.on("seek",({roomId,time})=>{

      const user = getUser(roomId, socket.id)

      if(!user) return

      if(user.role === "host" || user.role === "moderator"){
        io.to(roomId).emit("seek",time)
      }

    })


    // CHANGE VIDEO (Host only)
    socket.on("change_video",({roomId,videoId})=>{

      const user = getUser(roomId, socket.id)

      if(!user) return

      if(user.role === "host"){
        io.to(roomId).emit("change_video",videoId)
      }

    })


    // PROMOTE MODERATOR (Host only)
    socket.on("promote_moderator",({roomId, socketId})=>{

      const user = getUser(roomId, socket.id)

      if(!user) return

      if(user.role === "host"){

        promoteUser(roomId, socketId)

        io.to(roomId).emit("participants", getUsers(roomId))

      }

    })

    socket.on("seek", ({roomId, time}) => {

       const user = getUser(roomId, socket.id)

        if(!user) return

         if(user.role === "host" || user.role === "moderator"){

          io.to(roomId).emit("seek", time)

         }

    })


  })

}

module.exports = socketHandler