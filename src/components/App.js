import React, { Component } from 'react';
import Navbar from './Navbar';
import CardGrid from './CardGrid';
import AddPost from './AddPost';
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