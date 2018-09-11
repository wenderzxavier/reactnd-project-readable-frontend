import React, { Component } from 'react';
import Navbar from './Navbar';
import CardGrid from './CardGrid';
import Post from './Post';
import AddPost from './AddPost';
import { Route } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => {
          <div>
            <Navbar></Navbar>
            <CardGrid></CardGrid>
            <AddPost></AddPost>
          </div>
        }} />
        <Route exact path={"/" + category} render={() => {
          <div>
            <Navbar></Navbar>
            <CardGrid category={category}></CardGrid>
            <AddPost></AddPost>
          </div>
        }} />
        <Route exact path={"/" + category + "/" + post} render={() => {
          <div>
            <Navbar></Navbar>
            <Post post={post}></Post>
            <AddComment></AddComment>
          </div>
        }}/>
      </div>
    );
  }
}

export default App;