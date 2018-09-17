import React, { Component } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CommentIcon from '@material-ui/icons/Comment';
import { getPost, getAllComments } from '../utils/ReadableAPI';
import { withStyles } from '@material-ui/core/styles';
import Bookmark from '@material-ui/icons/Bookmark';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { blue, red, orange } from '@material-ui/core/colors';
import Build from '@material-ui/icons/Build';
import AddComment from '../components/AddEditComment';

const styles = {
    comments: {
        marginLeft: 75,
        flexGrow: 2
    },
    flex: {
        display: 'flex'
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
    edit: {
        marginLeft: 75,
        flexGrow: 1,
        '&:hover': {
            color: orange[300]
        },
    },

}

class Post extends Component {

    state = {
        title: "",
        author: "",
        body: "",
        category: "",
        postId: "",
        comments: {},
    }

    componentWillMount() {
        getPost(this.props.id).then((response) => {
            this.setState({
                postId: response.id,
                author: response.author,
                body: response.body,
                category: response.category,
                title: response.title
            })
        })

        getAllComments(this.props.id).then((response) => {
            console.log(response)
            this.setState({
                comments: response
            })
        })
    }

    render() {
        const { classes } = this.props;
        const { postId, author, title, body, category, comments } = this.state
        return (
            <div>
                <List>
                    <ListItem className={classes.flex}>
                        <Bookmark color="primary" />
                        <ListItemText primary={title.toUpperCase()} secondary={author} />
                        <Build color="action" className={classes.edit} />
                    </ListItem>
                    {comments.length > 0 ? (comments.map((comment, key) => {
                        return (
                            <div key={key}>
                                <Divider />
                                <ListItem className={classes.flex}>
                                    <div className={classes.comments}>
                                        <CommentIcon />
                                        <Typography className={classes.pos} color="textSecondary">
                                            Posted on {new Date(comment.timestamp * 1e3).toString().slice(4, 10)} by {comment.author}
                                        </Typography>
                                        <ListItemText primary={comment.body} />
                                    </div>
                                    <div className={classes.flex}>
                                        <ThumbUp color="action" className={classes.commentUpvote} />
                                        <ThumbDown color="action" className={classes.commentDownvote} />
                                        <Typography color="textSecondary" style={{ marginLeft: 15 }}>
                                            Vote Score: {comment.voteScore}
                                        </Typography>
                                        <Build color="action" className={classes.edit} />
                                    </div>

                                </ListItem>

                            </div>
                        )
                    })) : (
                            <div>No Comments to Show.</div>
                        )}
                </List>
                <AddComment parentId={postId}/>
            </div>
        )
    }
}

export default withStyles(styles)(Post);
