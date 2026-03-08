import { useState } from "react"
import { socket } from "../socket"

function RoomControls({ setRoomId }) {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const createRoom = () => {

    if (!username || !room) return

    socket.emit("create_room", {
      roomId: room,
      username
    })

    setRoomId(room)

  }

  const joinRoom = () => {

    if (!username || !room) return

    socket.emit("join_room", {
      roomId: room,
      username
    })

    setRoomId(room)

  }

  return (

    <div className="flex flex-col gap-4">

      <input
        placeholder="Username"
        className="p-3 rounded-lg outline-none"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Room ID"
        className="p-3 rounded-lg outline-none"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />

      <div className="flex gap-4">

        <button
          onClick={createRoom}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Create Room
        </button>

        <button
          onClick={joinRoom}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Join Room
        </button>

      </div>

    </div>

  )
}

export default RoomControls