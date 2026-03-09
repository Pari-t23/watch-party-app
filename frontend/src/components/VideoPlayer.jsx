import { useEffect, useRef, useState } from "react"
import { socket } from "../socket"

function VideoPlayer({ roomId }) {

  const playerRef = useRef(null)
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ")
  const [url, setUrl] = useState("")

  useEffect(() => {

    const loadYouTubeAPI = () => {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
    }

    loadYouTubeAPI()

    window.onYouTubeIframeAPIReady = () => {

      playerRef.current = new window.YT.Player("player", {

        height: "450",
        width: "100%",

        videoId: videoId,

        playerVars: {
          controls: 1
        },

        events: {

          onReady: () => {
            console.log("Player Ready")
          },

          onStateChange: (event) => {

            if (!playerRef.current) return

            const state = event.data

            if (state === window.YT.PlayerState.PLAYING) {
              socket.emit("play", { roomId })
            }

            if (state === window.YT.PlayerState.PAUSED) {
              socket.emit("pause", { roomId })
            }
          }
        }
      })
    }

    socket.on("play", () => {
      if (playerRef.current) playerRef.current.playVideo()
    })

    socket.on("pause", () => {
      if (playerRef.current) playerRef.current.pauseVideo()
    })

    socket.on("seek", ({ time }) => {
      if (playerRef.current) playerRef.current.seekTo(time, true)
    })

    socket.on("change-video", ({ videoId }) => {
      if (playerRef.current) playerRef.current.loadVideoById(videoId)
      setVideoId(videoId)
    })

  }, [roomId])


  const handleSeek = () => {

    if (!playerRef.current) return

    const time = playerRef.current.getCurrentTime()

    socket.emit("seek", {
      roomId,
      time
    })
  }


  const handlePlay = () => {

    if (!playerRef.current) return

    playerRef.current.playVideo()

    socket.emit("play", { roomId })
  }


  const handlePause = () => {

    if (!playerRef.current) return

    playerRef.current.pauseVideo()

    socket.emit("pause", { roomId })
  }


  const handleChangeVideo = () => {

    const id = url.split("v=")[1]?.split("&")[0]

    if (!id) return

    setVideoId(id)

    socket.emit("change-video", {
      roomId,
      videoId: id
    })

    setUrl("")
  }


  return (
    <div>

      <div id="player"></div>

      <div style={{ marginTop: "10px" }}>

        <button onClick={handlePlay}>▶ Play</button>

        <button onClick={handlePause} style={{ marginLeft: "10px" }}>
          ⏸ Pause
        </button>

      </div>


      <div style={{ marginTop: "15px" }}>

        <input
          type="text"
          placeholder="Paste YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleChangeVideo}
          style={{ marginLeft: "10px" }}
        >
          Change Video
        </button>

      </div>

    </div>
  )
}

export default VideoPlayer