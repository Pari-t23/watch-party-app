import { useEffect, useRef, useState } from "react"
import { socket } from "../socket"

function VideoPlayer({ roomId }) {

  const playerRef = useRef(null)
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ")
  const [url, setUrl] = useState("")

  // Load YouTube Player
  useEffect(() => {

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {

      playerRef.current = new window.YT.Player("player", {
        height: "390",
        width: "640",
        videoId: videoId
      })

    }

  }, [videoId])

  // SOCKET LISTENERS
  useEffect(() => {

    socket.on("play", () => {
      playerRef.current?.playVideo()
    })

    socket.on("pause", () => {
      playerRef.current?.pauseVideo()
    })

    socket.on("seek", (time) => {
      playerRef.current?.seekTo(time, true)
    })

    socket.on("change_video", (id) => {

      setVideoId(id)

      if (playerRef.current) {
        playerRef.current.loadVideoById(id)
      }

    })

    return () => {
      socket.off("play")
      socket.off("pause")
      socket.off("seek")
      socket.off("change_video")
    }

  }, [])

  const changeVideo = () => {

    const id = url.split("v=")[1]

    if (!id) return

    socket.emit("change_video", {
      roomId,
      videoId: id
    })

  }

  return (

    <div>

      <h3>Watch Video</h3>

      <div id="player"></div>

      <br />

      <button onClick={() => socket.emit("play", { roomId })}>
        ▶ Play
      </button>

      <button onClick={() => socket.emit("pause", { roomId })}>
        ⏸ Pause
      </button>

      <br /><br />

      <input
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={changeVideo}>
        Change Video
      </button>

    </div>

  )
}

export default VideoPlayer