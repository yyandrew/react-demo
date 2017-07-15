import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import GamesPage from './component/GamesPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div>
            <Link to="/games">Games</Link>
          </div>
          <div>
            <Route path="/games" component={GamesPage}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
