import { useEffect, useState } from "react"
import { socket } from "../socket"

function Participants() {

  const [participants, setParticipants] = useState([])

  useEffect(() => {

    socket.on("participants", (users) => {
      setParticipants(users)
    })

  }, [])

  return (

    <div>

      <h3>Participants</h3>

      {participants.map((p, i) => (

        <div key={i}>
          {p.username} ({p.role})
        </div>

      ))}

    </div>
  )
}

export default Participants