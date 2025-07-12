// server/index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // ✅ Match your React frontend
    methods: ['GET', 'POST'],
    credentials: true                // ✅ Required for some browsers
  }
});

// Store all game rooms
const games = {};

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Join a room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`➡️  Player ${socket.id} joined room: ${roomId}`);

    if (!games[roomId]) {
      games[roomId] = {
        players: [],
        hands: {},
        turn: 0,
        discardPile: [],
      };
      console.log(`🆕 New game room created: ${roomId}`);
    }

    const game = games[roomId];

    if (!game.players.includes(socket.id)) {
      game.players.push(socket.id);
      game.hands[socket.id] = drawInitialHand();
      console.log(`🃏 Player ${socket.id} assigned hand of cards.`);
    }

    io.to(roomId).emit('game_state', game);
  });

  // Handle play card
  socket.on('play_card', ({ roomId, card }) => {
    const game = games[roomId];
    game.discardPile.unshift(card);
    game.turn = (game.turn + 1) % game.players.length;

    io.to(roomId).emit('game_state', game);
  });

  // Draw card
  socket.on('draw_card', (roomId) => {
    const game = games[roomId];
    game.hands[socket.id].push(getRandomCard());

    io.to(roomId).emit('game_state', game);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    // Optional cleanup can be done here
  });
});

// Helpers
function drawInitialHand() {
  const hand = [];
  for (let i = 0; i < 7; i++) {
    hand.push(getRandomCard());
  }
  return hand;
}

function getRandomCard() {
  const colors = ['red', 'green', 'blue', 'yellow', 'wild'];
  const values = ['0','1','2','3','4','5','6','7','8','9','reverse','skip','draw_two','draw_four','wild'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const value = values[Math.floor(Math.random() * values.length)];
  return { color, value };
}

server.listen(3001, () => {
  console.log('🚀 Server running on http://localhost:3001');
});
