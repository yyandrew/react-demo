import React from 'react';

export function GameCard({game}) {
  console.log(game);
  return (
    <div className="ui card">
      <div className="image"><img src={game.cover} alt="game cover" /></div>
      <div className="content">
        <div className="header">{game.title}</div>
      </div>
    </div>
  );
}

