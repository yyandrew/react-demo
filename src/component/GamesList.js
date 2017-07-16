import React from 'react';
import { GameCard } from './GameCard';

export function GamesList({games}) {
  const emptyMessage = (
    <p>THere are no games yet in your collection</p>
  );

  const gamesList = (
    <div className="ui four cards">
    { games.map(game => <GameCard game={game} key={game._id} />)}
    </div>
  );
  return  (
    <div>
      { games.length === 0 ? emptyMessage : gamesList }
    </div>
  )
}
