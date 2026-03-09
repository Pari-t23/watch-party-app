const rooms = {}

function socketHandler(io) {

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id)

    socket.on("join-room", ({ roomId, username }) => {

      socket.join(roomId)

      if (!rooms[roomId]) {
        rooms[roomId] = []
      }

      let role = "participant"

      if (rooms[roomId].length === 0) {
        role = "host"
      } else if (rooms[roomId].length === 1) {
        role = "moderator"
      }

      const user = {
        id: socket.id,
        name: username || "user",
        role: role
      }

      rooms[roomId].push(user)

      io.to(roomId).emit("participants", rooms[roomId])

      socket.on("disconnect", () => {

        rooms[roomId] = rooms[roomId].filter(
          (u) => u.id !== socket.id
        )

        io.to(roomId).emit("participants", rooms[roomId])
      })

    })

    socket.on("play", ({ roomId }) => {
      socket.to(roomId).emit("play")
    })

    socket.on("pause", ({ roomId }) => {
      socket.to(roomId).emit("pause")
    })

    socket.on("seek", ({ roomId, time }) => {
      socket.to(roomId).emit("seek", { time })
    })

    socket.on("change-video", ({ roomId, videoId }) => {

      io.to(roomId).emit("change-video", { videoId })

    })

  })
}

module.exports = socketHandler