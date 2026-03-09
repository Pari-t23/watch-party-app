import { useEffect, useRef, useState } from "react"
import { socket } from "../socket"

function VideoPlayer({ roomId, role }) {

  const playerRef = useRef(null)
  const [url, setUrl] = useState("")

  useEffect(() => {

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {

      playerRef.current = new window.YT.Player("player", {
        height: "450",
        width: "100%",
        videoId: "dQw4w9WgXcQ"
      })
    }

    socket.on("play", () => playerRef.current?.playVideo())
    socket.on("pause", () => playerRef.current?.pauseVideo())

    socket.on("change-video", ({ videoId }) => {
      playerRef.current?.loadVideoById(videoId)
    })

  }, [])

  const play = () => {
    socket.emit("play", { roomId })
  }

  const pause = () => {
    socket.emit("pause", { roomId })
  }

  const changeVideo = () => {

    let id = ""

    if (url.includes("youtube.com")) {
      id = url.split("v=")[1]?.split("&")[0]
    }

    if (url.includes("youtu.be")) {
      id = url.split("youtu.be/")[1]
    }

    if (!id) return

    socket.emit("change-video", {
      roomId,
      videoId: id
    })

    setUrl("")
  }

  return (

    <div>

      <div id="player"></div>

      {(role === "host" || role === "moderator") && (

        <div className="mt-3 flex gap-2">

          <button onClick={play}>▶ Play</button>
          <button onClick={pause}>⏸ Pause</button>

        </div>

      )}

      {(role === "host" || role === "moderator") && (

        <div className="mt-3">

          <input
            placeholder="Paste YouTube URL"
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
          />

          <button onClick={changeVideo}>
            Change Video
          </button>

        </div>

      )}

    </div>

  )
}

export default VideoPlayer