export const SET_GAMES = 'SET_GAMES';
export const GAME_DELETED = 'GAME_DELETED';

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

// send delete game request
export function deleteGame(id) {
  return dispatch => {
    return fetch(`/api/games/${id}`, {
      method: 'delete',
      header: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(gameDeleted(id)))
  }
}

// delete game form react state
export function gameDeleted(gameId) {
  return {
    type: GAME_DELETED,
    gameId
  }
}

export function saveGame(game) {
  return dispatch => {
    return fetch('/api/games', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    }).then(handleResponse);
  }
}
