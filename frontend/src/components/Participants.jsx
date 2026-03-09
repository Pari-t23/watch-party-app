import { useEffect, useState } from "react"
import { socket } from "../socket"

function Participants({ roomId }) {

  const [users, setUsers] = useState([])

  useEffect(() => {

    socket.emit("join-room", {
  roomId,
  username: "user" + Math.floor(Math.random() * 100)
})

    socket.on("participants", (data) => {
      setUsers(data)
    })

    return () => {
      socket.off("participants")
    }

  }, [roomId])

  return (

    <div>

      <h2 className="text-lg mb-2">Participants</h2>

      {users.map((user, index) => (

        <div key={index} className="flex justify-between mb-2">

          <span>
            {user.name} ({user.role})
          </span>

        </div>

      ))}

    </div>
  )
}

export default Participants