import { useEffect, useRef, useState } from "react"
import { socket } from "../socket"

function VideoPlayer({ roomId }) {

  const playerRef = useRef(null)

  const [url, setUrl] = useState("")



  // LOAD YOUTUBE PLAYER
  useEffect(() => {

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {

      playerRef.current = new window.YT.Player("player", {

        height: "390",
        width: "640",
        videoId: "dQw4w9WgXcQ",

        events: {

          onReady: () => {
            console.log("Player Ready")
          },

          onStateChange: () => {

            if (!playerRef.current) return

            const time = playerRef.current.getCurrentTime()

            socket.emit("seek", {
              roomId,
              time
            })

          }

        }

      })

    }

  }, [roomId])



  // SOCKET EVENTS
  useEffect(() => {

    socket.on("play", () => {

      if (playerRef.current) {
        playerRef.current.playVideo()
      }

    })


    socket.on("pause", () => {

      if (playerRef.current) {
        playerRef.current.pauseVideo()
      }

    })


    socket.on("seek", (time) => {

      if (playerRef.current) {
        playerRef.current.seekTo(time, true)
      }

    })


    socket.on("change_video", (videoId) => {

      if (playerRef.current) {
        playerRef.current.loadVideoById(videoId)
      }

    })


    return () => {

      socket.off("play")
      socket.off("pause")
      socket.off("seek")
      socket.off("change_video")

    }

  }, [])



  // CHANGE VIDEO
  const changeVideo = () => {

    try {

      const videoId = new URL(url).searchParams.get("v")

      if (!videoId) return

      socket.emit("change_video", {
        roomId,
        videoId
      })

    } catch {
      alert("Invalid YouTube URL")
    }

  }



  return (

    <div>

      <h3>Watch Video</h3>

      <div id="player"></div>

      <br />


      <button
        onClick={() => socket.emit("play", { roomId })}
      >
        ▶ Play
      </button>


      <button
        onClick={() => socket.emit("pause", { roomId })}
      >
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