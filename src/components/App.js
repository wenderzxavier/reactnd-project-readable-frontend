import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

class App extends Component {
  render() {
    let token = localStorage.token
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Token = {token}
        </p>
      </div>
    );
  }
}

export default App;
