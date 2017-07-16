import React from 'react';
import { connect } from 'react-redux';
import { GamesList } from './GamesList';
import { fetchGames, deleteGame } from '../actions';

class GamesPage extends React.Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div>
        <h1>Games List</h1>
        <GamesList games={this.props.games} deleteGame={this.props.deleteGame}></GamesList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.games
  }
}

export default connect(mapStateToProps, { fetchGames, deleteGame })(GamesPage);
