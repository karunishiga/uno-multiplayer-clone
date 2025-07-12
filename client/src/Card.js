import React from 'react';

const Card = ({ color, value }) => {
  const imageName = `${color}_${value}.jpg`;
  const imagePath = `/cards/${imageName}`;

  return (
    <img
      src={imagePath}
      alt={`${color} ${value}`}
      className="card-img"
    />
  );
};

export default Card;
