import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
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
        const { classes } = this.props;
        const { posts } = this.state;
        console.log(posts);
        return (
            <div>
                <Grid container className={classes.root} justify="center">
                    {posts.length <= 0 ? <p>No posts to show.</p> : (
                        posts.map((item, key) => {
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