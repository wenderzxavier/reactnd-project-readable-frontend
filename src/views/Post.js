import React, { Component } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import { getPost, getAllComments } from '../utils/ReadableAPI';

class Post extends Component {
    state = {
        title: "",
        author: "",
        body: "",
        category: "",
        comments: {},
    }

    componentWillMount() {
        getPost(this.props.id).then((response) => {
            this.setState({
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
        const { author, title, body, category, comments } = this.state
        return (
            <div>
                <List>
                    <ListItem>
                        <Avatar>
                            <CommentIcon />
                        </Avatar>
                        <ListItemText primary={title} secondary={author} />
                    </ListItem>
                    {comments.length > 0 ? (comments.map((comment, key) => {
                        return (
                            <div key={key}>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary={comment.author} secondary={comment.body} />
                                </ListItem>

                            </div>
                        )
                    })) : (
                        <div>No Comments to Show.</div>
                    )}
                </List>
            </div>
        )
    }
}

export default Post;