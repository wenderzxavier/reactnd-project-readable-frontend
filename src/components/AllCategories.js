import React, { Component } from 'react';
import Navigation from "./Navigation";
import Post from "./Post";
import Sort from "./Sort";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/LibraryAdd'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    extendedIcon: {
        marginRight: theme.spacing.unit,
    }
})

class AllCategories extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Navigation/>
                <div className="page-section">
                    <div className="page-top">
                        <div className="buttons-top">
                            <Link to='/addpost'>
                                <Button variant="extendedFab" color="primary" aria-label="Delete" className="post-button">
                                    <AddIcon className={classes.extendedIcon}/> Add Post
                                </Button>
                            </Link>
                        </div>
                        <Sort/>
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
export default withStyles(styles)(AllCategories);
