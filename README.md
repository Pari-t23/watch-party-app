# YouTube Watch Party Application

A **real-time YouTube Watch Party web application** where multiple users can watch the same video together with synchronized playback.

Built using **Node.js, Socket.IO, React (Vite), and TailwindCSS**.

---

# Features

* Create a new **Watch Party Room**
* Join an existing room using **Room ID**
* Real-time **YouTube video synchronization**
* **Play / Pause synchronization**
* **Seek synchronization**
* **Change video for all participants**
* **Participant roles**

  *  Host
  * Moderator
  *  Participant
* Host can:

  * Assign roles
  * Remove participants
* Real-time **Participants list**

---

#  Tech Stack

Frontend

* React (Vite)
* TailwindCSS
* Socket.IO Client

Backend

* Node.js
* Express
* Socket.IO

Other

* YouTube Iframe API

---

# Project Structure

```
watch-party-app
│
├── backend
│   ├── server.js
│   ├── socketHandler.js
│   ├── roomManager.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── Participants.jsx
│   │   │   └── RoomControls.jsx
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
```

---

#  Installation

###  Clone Repository

```
git clone https://github.com/Pari-t23/watch-party-app.git
```

###  Backend Setup

```
cd watch-party-app/backend
npm install
node server.js
```

Server runs on:

```
http://localhost:3000
```

---

###  Frontend Setup

```
cd ../frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

#  Testing

1. Open the application in **two browser tabs**
2. Create a room in the first tab (Host)
3. Join the same room from the second tab (Participant)
4. Test the following features:

* Play / Pause sync
* Seek synchronization
* Change video
* Assign moderator
* Remove participant

---

#  Deployment

This project can be deployed using:

* Render
* Railway
* Vercel (Frontend)

---

#  Future Improvements

* Chat system
* Video queue
* Room invite links
* Authentication

---

#  Author

**Pari Tiwari**

GitHub
https://github.com/Pari-t23

---
