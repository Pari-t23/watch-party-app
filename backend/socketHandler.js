const rooms = {}

function socketHandler(io) {

  io.on("connection", (socket) => {

    socket.on("join-room", ({ roomId }) => {

      socket.join(roomId)

      if (!rooms[roomId]) {
        rooms[roomId] = []
      }

      const user = {
        id: socket.id,
        name: "user" + Math.floor(Math.random() * 100),
        role: rooms[roomId].length === 0 ? "host" : "participant"
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

    socket.on("change-video", ({ roomId, videoId }) => {
      socket.to(roomId).emit("change-video", { videoId })
    })

  })
}

module.exports = socketHandler