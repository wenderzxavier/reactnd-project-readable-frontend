import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import CardGrid from '../components/CardGrid';
import Post from './Post';
import AddPost from '../components/AddPost';
import AddComment from '../components/AddComment'
import { Route } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <Navbar></Navbar>
            <CardGrid></CardGrid>
            <AddPost></AddPost>
          </div>
        )} />
        <Route exact path={"/:category"} render={() => (
          <div>
            <Navbar></Navbar>
            <CardGrid></CardGrid>
            <AddPost></AddPost>
          </div>
        )} />
        <Route exact path={"/:category/:post"} render={() => (
          <div>
            <Navbar></Navbar>
            <Post></Post>
            <AddComment></AddComment>
          </div>
        )}/>
      </div>
    )
  }
}

export default App;