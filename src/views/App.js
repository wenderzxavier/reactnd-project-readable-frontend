import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import CardGrid from '../components/CardGrid';
import AddPost from '../components/AddPost';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <CardGrid></CardGrid>
        <AddPost></AddPost>
      </div>
    );
  }
}

export default App;