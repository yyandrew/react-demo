import React from 'react';
export function GamesList({games}) {
  const emptyMessage = (
    <p>THere are no games yet in your collection</p>
  );

  const gamesList = (
    <p>games list</p>
  );
  return  (
    <div>
      { games.length === 0 ? emptyMessage : gamesList }
    </div>
  )
}
