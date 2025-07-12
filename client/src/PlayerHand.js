import React from 'react';
import Card from './Card';

const PlayerHand = () => {
  const cards = [
    { color: 'red', value: '5' },
    { color: 'blue', value: 'skip' },
    { color: 'green', value: '2' },
    { color: 'yellow', value: '9' },
    { color: 'wild', value: 'draw_four' },
    { color: 'red', value: 'reverse' },
    { color: 'blue', value: '3' },
  ];

  return (
    <div className="player-hand">
      {cards.map((card, idx) => (
        <Card key={idx} color={card.color} value={card.value} />
      ))}
    </div>
  );
};

export default PlayerHand;
