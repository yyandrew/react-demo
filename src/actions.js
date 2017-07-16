export const SET_GAMES = 'SET_GAMES';

function handleResponse(res) {
  if(res.ok) {
    return res.json();
  } else {
    var error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
}
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

export function saveGame(game) {
  return dispatch => {
    return fetch('/api/games', {
      method: 'post',
      heanders: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    }).then(handleResponse);
  }
}
