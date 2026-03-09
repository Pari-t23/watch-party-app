const rooms = {}

function createRoom(roomId, username, socketId) {

  if (!rooms[roomId]) {
    rooms[roomId] = {
      users: []
    }
  }

  rooms[roomId].users.push({
    username,
    socketId,
    role: "host"
  })

}

function joinRoom(roomId, username, socketId) {

  if (!rooms[roomId]) return

  const role = rooms[roomId].users.length === 1 ? "moderator" : "participant"

  rooms[roomId].users.push({
    username,
    socketId,
    role
  })

}

function getUsers(roomId) {
  if (!rooms[roomId]) return []
  return rooms[roomId].users
}

function getUser(roomId, socketId) {

  const room = rooms[roomId]
  if (!room) return null

  return room.users.find(u => u.socketId === socketId)

}

module.exports = {
  createRoom,
  joinRoom,
  getUsers,
  getUser
}