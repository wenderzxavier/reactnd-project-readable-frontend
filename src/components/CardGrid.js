import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PostCard from './PostCard';
import Grid from '@material-ui/core/Grid';
import { getAllPosts } from '../utils/ReadableAPI';

const styles = {
    root: {
        flexGrow: 1,
        margin: 6,
    },
}

class CardGrid extends Component {
    state = {
        posts: []
    }

    componentWillMount() {
        getAllPosts().then((response) => {
            this.setState({ 
                posts: response
            })
        })
    }

    render() {
        const { classes, category } = this.props;
        const { posts } = this.state;
        let postsToShow = {};
        if( category !== "" ){
            postsToShow = posts.filter((item) => item.category === category )
        } else postsToShow = posts
        return (
            <div>
                <Grid container className={classes.root} justify="center">
                    {postsToShow.length <= 0 ? <p>No posts to show.</p> : (
                        postsToShow.map((item, key) => {
                            return (
                                <PostCard key={key} post={item}></PostCard>
                            )
                        })
                    )}
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(CardGrid);