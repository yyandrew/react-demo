export const SET_GAMES = 'SET_GAMES';

export function fetchGames() {
  return dispatch => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => dispatch(setGames(data.games)));
  }
}

export function setGames(games) {
  return {
    type: SET_GAMES,
    games
  }
}
