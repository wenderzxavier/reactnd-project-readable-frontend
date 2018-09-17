import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { blue, red } from '@material-ui/core/colors';
import { setPostVote } from '../utils/ReadableAPI';

const styles = {
    card: {
        minWidth: 475,
        margin: 6,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        flexGrow: 2,
    },
    pos: {
        marginBottom: 12,
    },
    comment: {
        marginTop: 12,
    },
    commentUpvote: {
        '&:hover': {
            color: blue[600]
        },
    },
    commentDownvote: {
        marginLeft: 10,
        '&:hover': {
            color: red[600]
        },
    },
}


class PostCard extends Component {
    handleVote = (evt, id, vote) => {
        evt.preventDefault();
        setPostVote({id, vote});
    }


    render() {
        const { classes, post } = this.props;
        return (
            <Link style={{ textDecoration: 'none' }} to={"/posts/" + post.id}>
                <div className="divPost">
                    <Card className={classes.card}>
                        <CardContent >
                            <div style={{ display: 'flex' }}>
                                <Typography className={classes.title} color="textSecondary">
                                    {post.category.toUpperCase()}
                                </Typography>
                                <div className={classes.flex}>
                                    <ThumbUp color="action" className={classes.commentUpvote} onClick={(evt) => this.handleVote(evt, post.id, "upVote")} />
                                    <ThumbDown color="action" className={classes.commentDownvote} onClick={(evt) => this.handleVote(evt, post.id, "downVote")} />
                                    <Typography className={classes.pos} color="textSecondary">
                                        Vote Score: {post.voteScore}
                                    </Typography>

                                </div>
                            </div>
                            <Typography variant="headline" component="h2">
                                {post.title}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {post.author} | {new Date(post.timestamp * 1e3).toString().slice(0, 10)}
                            </Typography>
                            <Typography component="p">
                                {post.body}
                            </Typography>
                            <Typography className={classes.comment} color="textSecondary">
                                Comments ({post.commentCount})
                    </Typography>
                        </CardContent>
                    </Card>
                </div>
            </Link>
        );
    }
}

PostCard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostCard);