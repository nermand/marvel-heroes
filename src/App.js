import React, { Component } from 'react';
import logo from './marvel.svg';
import './App.css';
import HomeContainer from './containers/HomeContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Marvel Characters Search Engine</h1>
        </header>

        <HomeContainer />
      </div>
    );
  }
}

export default App;
