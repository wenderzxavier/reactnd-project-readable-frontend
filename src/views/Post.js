import React, {Component } from 'react';
import NavBar from '../components/Navbar';
import ArrowBack from '@material-ui/icons/ArrowBack'

class Post extends Component{
    render(){
        return(
            <div>
                <NavBar></NavBar>
                <div>
                    <ArrowBack />
                </div>
            </div>
        )
    }
}

export default Post;