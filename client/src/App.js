import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3001'); // No trailing slash

function App() {
  const [hand, setHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [gameReady, setGameReady] = useState(false);
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    // Connect and join fixed room
    socket.on('connect', () => {
      setPlayerId(socket.id);
      socket.emit('join_room', 'room1');
    });

    // Update game state
    socket.on('game_state', (game) => {
      setHand(game.hands[socket.id] || []);
      setDiscardPile(game.discardPile);
      setGameReady(game.players.length >= 2);
    });

    return () => socket.disconnect();
  }, []);

  const handleDrawCard = () => {
    socket.emit('draw_card', 'room1');
  };

  const handlePlayCard = (card, index) => {
    const newHand = [...hand];
    newHand.splice(index, 1);
    setHand(newHand);
    socket.emit('play_card', { roomId: 'room1', card });
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: 'cover',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h1 style={{ color: 'white' }}>UNO Multiplayer 🎮</h1>

      {!gameReady ? (
        <p style={{ color: 'white', fontSize: '20px' }}>Waiting for other player to join...</p>
      ) : (
        <>
          <p style={{ color: 'white' }}>You are: {playerId}</p>

          {/* Discard Pile */}
          <div style={{ margin: '20px auto' }}>
            <p style={{ color: 'white', fontWeight: 'bold' }}>Discard Pile</p>
            {discardPile.length > 0 && (
              <img
                src={`/cards/${discardPile[0].color}_${discardPile[0].value}.jpg`}
                alt="Discard"
                style={{
                  width: '110px',
                  height: '160px',
                  borderRadius: '10px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.6)',
                }}
              />
            )}
          </div>

          {/* Draw Pile */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: 'white', fontWeight: 'bold' }}>Draw Pile</p>
            <img
              src="/cards/draw_pile.jpg"
              alt="Draw"
              onClick={handleDrawCard}
              style={{
                width: '110px',
                height: '160px',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* Your Cards */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
            {hand.map((card, index) => (
              <img
                key={index}
                src={`/cards/${card.color}_${card.value}.jpg`}
                alt={`${card.color} ${card.value}`}
                style={{
                  width: '100px',
                  height: '150px',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                }}
                onClick={() => handlePlayCard(card, index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
