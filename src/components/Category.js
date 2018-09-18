import React, { Component } from 'react';
import Navigation from "./Navigation";
import Post from "./Post";
import Sort from "./Sort";
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

class Category extends Component {
    render() {
        const categorySel = this.props.value
        return (

            <div>
                <Navigation value={categorySel} />
                <div className="page-section">
                    <div className="page-top">
                        <h1 className="page-header">{categorySel}</h1>
                        <div className="buttons-top">
                            <Link to='/addpost'>
                                <Button color="secondary" size="md" className="post-button">Add post</Button>
                            </Link>
                            <Sort/>
                        </div>
                    </div>
                    {(this.props.flag)?(
                        <Post category={categorySel}/>
                    ):(
                        <h2>No posts to show</h2>

                    )}
                </div>
            </div>
        );
    }
}
export default Category;
