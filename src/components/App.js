import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <a className="navbar-brand company-name" href="http://localhost:3000">
            <img src={logo} className="App-logo d-inline-block align-top" width="60" alt="logo" />
            ReactForum
          </a>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search Category" aria-label="Search" />
            <button class="btn btn-info my-2 my-sm-0" type="submit">Search </button>
          </form>
        </nav>
      </div>
    );
  }
}

export default App;
