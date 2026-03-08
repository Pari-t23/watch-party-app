import { useEffect, useState } from "react"
import { socket } from "../socket"

function Participants({ roomId }) {

  const [users, setUsers] = useState([])

  useEffect(() => {

    const handleParticipants = (data) => {
      setUsers(data)
    }

    socket.on("participants", handleParticipants)

    return () => {
      socket.off("participants", handleParticipants)
    }

  }, [roomId])

  return (

    <div>

      <h3 className="text-lg font-semibold mb-4">
        👥 Participants
      </h3>

      <ul className="space-y-2">

        {users.map((user, index) => (

          <li
            key={index}
            className="bg-white/20 p-2 rounded-lg flex justify-between"
          >

            <span>{user.username}</span>

            <span className="text-xs bg-indigo-500 px-2 py-1 rounded">
              {user.role}
            </span>

          </li>

        ))}

      </ul>

    </div>

  )
}

export default Participants