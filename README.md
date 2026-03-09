#  Watch Party App

A real-time YouTube Watch Party application where multiple users can watch videos together in sync.

---

##  Features

- Real-time video synchronization
- Host / Moderator / Participant roles
- Play / Pause control for Host and Moderator
- Change YouTube video
- Live participant list
- Multi-user watch party using Socket.IO

---

##  Tech Stack

Frontend
- React
- Vite
- Tailwind CSS

Backend
- Node.js
- Express
- Socket.IO

Other
- YouTube Iframe API

---

##  Project Structure

```
watch-party-app
│
├── backend
│   ├── server.js
│   ├── socketHandler.js
│   └── roomManager.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── RoomControls.jsx
│   │   │   └── Participants.jsx
│   │   └── App.jsx
│
└── README.md
```

---

##  Installation

### Clone Repository

```
git clone https://github.com/Pari-t23/watch-party-app.git
```

---

### Backend Setup

```
cd backend
npm install
node server.js
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

##  Usage

1. Open the application in two browser tabs.
2. Create a room in one tab.
3. Join the same room from another tab.
4. Start watching YouTube videos together in sync.

---

##  Roles

Host
- Create room
- Change video
- Control playback

Moderator
- Play / Pause video

Participant
- Watch synchronized video

---

##  Author

**Pari Tiwari**

GitHub  
https://github.com/Pari-t23
