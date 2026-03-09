import { useEffect,useState } from "react"
import { socket } from "../socket"

function Participants({roomId,setRole}){

  const [users,setUsers] = useState([])

  useEffect(()=>{

    const username = localStorage.getItem("username")

    socket.emit("join-room",{roomId,username})

    socket.on("participants",(data)=>{

      setUsers(data)

      const me = data.find(u=>u.id === socket.id)

      if(me){
        setRole(me.role)
      }

    })

  },[roomId])

  return(

    <div>

      <h2 className="text-lg mb-3">Participants</h2>

      {users.map((user)=>(
        <div key={user.id}>
          {user.name} ({user.role})
        </div>
      ))}

    </div>

  )
}

export default Participants