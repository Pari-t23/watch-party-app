const { createRoom, joinRoom, getUsers, getUser } = require("./roomManager")

function socketHandler(io) {

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id)

    socket.on("create_room", ({ roomId, username }) => {

      createRoom(roomId, username, socket.id)

      socket.join(roomId)

      io.to(roomId).emit("participants", getUsers(roomId))

    })


    socket.on("join_room", ({ roomId, username }) => {

      joinRoom(roomId, username, socket.id)

      socket.join(roomId)

      io.to(roomId).emit("participants", getUsers(roomId))

    })


    // PLAY
    socket.on("play", ({ roomId }) => {

      const user = getUser(roomId, socket.id)
      if (!user) return

      if (user.role === "host" || user.role === "moderator") {
        io.to(roomId).emit("play")
      }

    })


    // PAUSE
    socket.on("pause", ({ roomId }) => {

      const user = getUser(roomId, socket.id)
      if (!user) return

      if (user.role === "host" || user.role === "moderator") {
        io.to(roomId).emit("pause")
      }

    })


    // SEEK
    socket.on("seek", ({ roomId, time }) => {

      const user = getUser(roomId, socket.id)
      if (!user) return

      if (user.role === "host" || user.role === "moderator") {
        io.to(roomId).emit("seek", time)
      }

    })


    // CHANGE VIDEO
    socket.on("change_video", ({ roomId, videoId }) => {

      const user = getUser(roomId, socket.id)
      if (!user) return

      if (user.role === "host") {
        io.to(roomId).emit("change_video", videoId)
      }

    })


    // CHANGE ROLE
    socket.on("change_role", ({ roomId, targetSocketId, role }) => {

      const user = getUser(roomId, socket.id)
      if (!user) return

      if (user.role === "host") {

        const users = getUsers(roomId)

        const targetUser = users.find(u => u.socketId === targetSocketId)

        if (targetUser) {
          targetUser.role = role
        }

        io.to(roomId).emit("participants", users)

      }

    })


    // REMOVE PARTICIPANT
    socket.on("remove_participant", ({ roomId, targetSocketId }) => {

      const user = getUser(roomId, socket.id)
      if (!user) return

      if (user.role === "host") {

        const users = getUsers(roomId)

        const index = users.findIndex(u => u.socketId === targetSocketId)

        if (index !== -1) {
          users.splice(index, 1)
        }

        io.to(roomId).emit("participants", users)

        io.to(targetSocketId).emit("removed")

      }

    })


  })

}

module.exports = socketHandler