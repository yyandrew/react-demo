import { SET_GAMES } from '../actions';
import { GAME_DELETED } from '../actions';

export default function geames(state = [], action = {}) {
  switch (action.type) {
    case SET_GAMES:
      return action.games;
    case GAME_DELETED:
      return state.filter(item => item._id !== action.gameId);
    default: return state;
  }
}
