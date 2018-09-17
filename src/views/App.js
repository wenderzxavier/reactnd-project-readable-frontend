import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import CardGrid from '../components/CardGrid';
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import { Route } from 'react-router-dom';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <div>
            <Navbar></Navbar>
            <CardGrid category=""></CardGrid>
            <AddPost></AddPost>
          </div>
        )} />
        <Route exact path={"/:category/posts"} render={({match}) => (
          <div>
            <Navbar></Navbar>
            <CardGrid category={match.params.category}></CardGrid>
            <AddPost></AddPost>
          </div>
        )} />
        <Route exact path={"/posts/:id"} render={({match}) => (
          <div>
            <Navbar></Navbar>
            <Post id={match.params.id}></Post>
          </div>
        )}/>
      </div>
    )
  }
}

export default App;