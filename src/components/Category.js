import React, { Component } from 'react';
import Navigation from "./Navigation";
import Post from "./Post";
import Sort from "./Sort";
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

class CategoryView extends Component {

    render() {
        const selectedCat = this.props.value
        return (
            <div>
                <Navigation value={selectedCat} />
                <div className="page-section">
                    <div className="page-top">
                        <h1 className="page-header">{selectedCat}</h1>
                        <div className="buttons-top">
                            <Link to='/addpost'>
                                <Button color="secondary" size="md" className="post-button">Add post</Button>
                            </Link>
                            <Sort/>
                        </div>
                    </div>
                    {(this.props.flag)?(
                        <Post category={selectedCat}/>
                    ):(
                        <h2>No posts to show</h2>
                    )}
                </div>
            </div>
        );
    }
}


export default CategoryView;
