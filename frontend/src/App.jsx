import { useState } from "react"
import RoomControls from "./components/RoomControls"
import VideoPlayer from "./components/VideoPlayer"
import Participants from "./components/Participants"

function App() {

  const [roomId, setRoomId] = useState(null)

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">

      <div className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-6xl">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          🎬 Watch Party
        </h1>

        {!roomId && (
          <RoomControls setRoomId={setRoomId} />
        )}

        {roomId && (
          <div className="grid md:grid-cols-3 gap-6">

            {/* Video Section */}
            <div className="md:col-span-2 bg-black/40 rounded-xl p-4">

              <h2 className="text-white text-lg mb-2">
                Room: {roomId}
              </h2>

              <VideoPlayer roomId={roomId} />

            </div>

            {/* Participants */}
            <div className="bg-white/20 rounded-xl p-4 text-white">

              <Participants roomId={roomId} />

            </div>

          </div>
        )}

      </div>

    </div>

  )
}

export default App