import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import GamesPage from './component/GamesPage';
import GamesForm from './component/GamesForm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="ui container">
          <div className="ui three item menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/games">Games</Link>
            <Link className="item" to="/games/new">New</Link>
          </div>
          <div>
            <Route exact path="/games" component={GamesPage}/>
            <Route exact path="/games/new" component={GamesForm}/>
            <Route exact path="/game/:_id" component={GamesForm}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
