import { useEffect, useState } from "react"
import { socket } from "../socket"

function Participants({ roomId, setRole }) {

  const [users, setUsers] = useState([])

  useEffect(() => {

    const username = "user" + Math.floor(Math.random() * 100)

    socket.emit("join-room", {
      roomId,
      username
    })

    socket.on("participants", (data) => {

      setUsers(data)

      const me = data.find(u => u.id === socket.id)

      if (me) setRole(me.role)

    })

    return () => {
      socket.off("participants")
    }

  }, [roomId])

  return (

    <div>

      <h2 className="text-lg mb-3">Participants</h2>

      {users.map((user) => (

        <div key={user.id} className="flex justify-between mb-2">

          <span>
            {user.name} ({user.role})
          </span>

        </div>

      ))}

    </div>

  )
}

export default Participants