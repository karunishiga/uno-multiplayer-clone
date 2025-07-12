🃏 UNO Multiplayer Clone
A real-time full-stack UNO multiplayer card game built using React, Node.js, Socket.IO, and Express. This project simulates a realistic UNO experience with animated card plays, drag-and-drop UX, and real-time multiplayer functionality.

<!-- Add demo gif or screenshot if you have one -->

🚀 Features
🎮 Real-time multiplayer gameplay with up to 4 players

🧠 Card animations using framer-motion

🎴 Draw & Discard piles

🔄 Turn-based logic

🌐 Socket.IO WebSockets for instant sync

🧰 Built with full-stack architecture (React + Node.js)

🛠️ Tech Stack
Frontend	Backend	Real-time	Database
React + CSS	Node.js + Express	Socket.IO	(Optional) MongoDB for persistent state

📂 Project Structure
php
Copy
Edit
uno-clone/
│
├── client/         # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/         # Node + Socket.IO Backend
│   └── index.js
│
└── README.md
🔧 Installation Steps
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/<your-username>/uno-multiplayer-clone.git
cd uno-multiplayer-clone
2. Install server dependencies
bash
Copy
Edit
cd server
npm install
node index.js
3. Install client dependencies
bash
Copy
Edit
cd ../client
npm install
npm start
 Open http://localhost:3000 in multiple browser windows to simulate multiplayer.

 Todo / Future Work
 Add authentication and login

Save game history to MongoDB

Add sound effects

Add animations and smoother UI transitions

 Make mobile-responsive

 Deploy using Vercel + Render
