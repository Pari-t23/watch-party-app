import { useState } from "react"

function RoomControls({ setRoomId }) {

  const [username, setUsername] = useState("")
  const [roomInput, setRoomInput] = useState("")

  const createRoom = () => {

    if (!username) {
      alert("Enter username")
      return
    }

    const newRoom = "room-" + Math.floor(Math.random() * 1000)

    setRoomId(newRoom)
  }

  const joinRoom = () => {

    if (!username || !roomInput) {
      alert("Enter username and room id")
      return
    }

    setRoomId(roomInput)
  }

  return (

    <div className="flex flex-col gap-4">

      <input
        placeholder="Username"
        className="p-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Room ID"
        className="p-2 rounded"
        value={roomInput}
        onChange={(e) => setRoomInput(e.target.value)}
      />

      <div className="flex gap-4">

        <button
          onClick={createRoom}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Create Room
        </button>

        <button
          onClick={joinRoom}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Join Room
        </button>

      </div>

    </div>
  )
}

export default RoomControls