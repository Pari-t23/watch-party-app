import { useEffect, useState } from "react"
import { socket } from "../socket"

function Participants({ roomId }) {

  const [users, setUsers] = useState([])

  useEffect(() => {

    socket.on("participants", (data) => {
      setUsers(data)
    })

    return () => socket.off("participants")

  }, [])



  const changeRole = (socketId, role) => {

    socket.emit("change_role", {
      roomId,
      targetSocketId: socketId,
      role
    })

  }


  const removeUser = (socketId) => {

    socket.emit("remove_participant", {
      roomId,
      targetSocketId: socketId
    })

  }



  return (

    <div>

      <h3>Participants</h3>

      {users.map((user, index) => (

        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}
        >

          <span>
            {user.username} ({user.role})
          </span>


          <div style={{ display: "flex", gap: "8px" }}>

            {user.role !== "host" && (

              <select
                value={user.role}
                onChange={(e) => changeRole(user.socketId, e.target.value)}
                style={{
                  padding: "3px",
                  borderRadius: "4px"
                }}
              >

                <option value="participant">Participant</option>
                <option value="moderator">Moderator</option>

              </select>

            )}


            {user.role !== "host" && (

              <button
                onClick={() => removeUser(user.socketId)}
                style={{
                  background: "#ff4d4d",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>

            )}

          </div>

        </div>

      ))}

    </div>

  )

}

export default Participants