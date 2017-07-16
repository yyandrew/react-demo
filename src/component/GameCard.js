import React from 'react';
import { Link } from 'react-router-dom';

export function GameCard({ game, deleteGame }) {
  return (
    <div className="ui card">
      <div className="image"><img src={game.cover} alt="game cover" /></div>
      <div className="content">
        <div className="header">{game.title}</div>
      </div>
      <div className="ui two buttons">
        <Link className="ui basic button green" to={`/game/${game._id}`}>Edit</Link>
        <div className="ui basic button red" onClick={() => deleteGame(game._id)}>Delete</div>
      </div>
    </div>
  );
}

