const rooms = {}

function createRoom(roomId, socketId, username) {

  rooms[roomId] = {
    users: [
      {
        socketId,
        username,
        role: "host"
      }
    ]
  }

}

function joinRoom(roomId, socketId, username) {

  if (!rooms[roomId]) return

  const users = rooms[roomId].users

  let role = "participant"

  // second user = moderator
  if (users.length === 1) {
    role = "moderator"
  }

  users.push({
    socketId,
    username,
    role
  })

}

function getUsers(roomId) {
  return rooms[roomId]?.users || []
}

module.exports = {
  createRoom,
  joinRoom,
  getUsers
}