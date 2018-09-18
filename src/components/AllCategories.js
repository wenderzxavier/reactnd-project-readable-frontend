import React, { Component } from 'react';
import Navigation from "./Navigation";
import Post from "./Post";
import Sort from "./Sort";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

class AllCategories extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <div className="page-section">
                    <div className="page-top">
                        <h1 className="page-header">All Posts</h1>
                        <div className="buttons-top">
                            <Link to='/addpost'>
                                <Button color="secondary" size="md" className="post-button">Add post</Button>
                            </Link>
                            <Sort/>
                        </div>
                    </div>
                    {(this.props.flag)?(
                        <Post/>
                    ):(
                        <h2>No posts to show</h2>

                    )}
                </div>
            </div>
        );
    }
}
export default AllCategories;
