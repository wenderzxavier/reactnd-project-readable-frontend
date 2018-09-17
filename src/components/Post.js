import React, { Component } from 'react';
import Modal from 'react-modal';
import { getPost, getAllComments, editPost, editComment, delPost, delComment, setCommentVote } from '../utils/ReadableAPI';
import AddComment from '../components/AddComment';

import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { blue, red, orange } from '@material-ui/core/colors';

import CommentIcon from '@material-ui/icons/Comment';
import Bookmark from '@material-ui/icons/Bookmark';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Build from '@material-ui/icons/Build';
import CloseIcon from '@material-ui/icons/HighlightOff';
import ThumbUp from '@material-ui/icons/ThumbUp';



const styles = theme => ({
    comments: {
        marginLeft: 75,
        flexGrow: 2
    },
    flex: {
        display: 'flex',
    },
    commentUpvote: {
        '&:hover': {
            color: blue[600],
            cursor: 'pointer'
        },
    },
    commentDownvote: {
        marginLeft: 10,
        '&:hover': {
            color: red[600],
            cursor: 'pointer'
        },
    },
    edit: {
        flexGrow: 1,
        '&:hover': {
            color: orange[300]
        },
    },
    iconButton: {
        marginLeft: 50,
    },




    iconRight: {
        marginRight: 12,
    },

    action: {
        position: 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },

    iconClose: {
        position: 'absolute',
        top: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 15
    },

    textField: {
        marginLeft: theme.spacing.unit * 1.5,
        marginRight: theme.spacing.unit * 1.5,
        width: 300,
    },

    textBody: {
        marginLeft: theme.spacing.unit * 1.5,
        marginRight: theme.spacing.unit * 1.5,
    },
    title: {
        margin: 25,
        fontSize: 30,
        fontFamily: 'Raleway'
    },
    postBody: {
        marginLeft: 25,
    },

})

class Post extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        modalIsOpen: false,
        modalType: "",
        title: "",
        author: "",
        body: "",
        category: "",
        postId: "",
        comments: {},
        commentAuthor: "",
        commentId: "",
        commentBody: "",
    }

    openModal = (type, commentDetails = {}) => {
        switch (type) {
            case 'editPost':
                this.setState({
                    modalType: "post",
                    modalIsOpen: true,
                })
                break;
            case 'editComment':
                this.setState({
                    modalType: "comment",
                    modalIsOpen: true,
                    commentAuthor: commentDetails.author,
                    commentId: commentDetails.id,
                    commentBody: commentDetails.body,
                })
                break;
            default:
                break;
        }
    }

    handleSubmit = (evt) => {
        if (!evt.target.checkValidity()) {
            alert('Some fields are missing or contain invalid data. Try again!')
            this.closeModal();
        }
        evt.preventDefault();
        if (this.state.modalType === 'post') {
            editPost(this.state.postId, this.state.body);
        }
        else {
            editComment(Date.now(), this.state.body);
        }
        this.closeModal();
    }

    handleDelete = () => {
        if (this.state.modalType === 'post') {
            delPost(this.state.postId);
        }
        else {
            delComment(this.state.commentId);
        }
        this.closeModal();
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
        })
    }

    componentWillMount() {
        Modal.setAppElement('body');
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
        const { modalIsOpen, postId, author, title, body, category, comments, modalType, commentAuthor, commentBody, commentId } = this.state
        return (
            <div>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={modalIsOpen}
                    onAfterOpen={this.openModal}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                    contentLabel='Modal'
                >
                    <div>
                        <Typography variant="title" align="center" className={classes.title}>
                            Edit Fields
                        </Typography>
                        <Button variant="extendedFab" color="secondary" className={classes.iconClose} aria-label="Delete" onClick={() => this.handleDelete()}>
                            Delete Item
                            <CloseIcon />
                        </Button>
                    </div>
                    <div>
                        <form id="addPostForm" className={classes.container} action="/" autoComplete="off" method="POST" onSubmit={(evt) => { this.handleSubmit(evt) }}>
                            {modalType === 'post' ?
                                <div>
                                    <TextField
                                        id="uuid"
                                        label="UUID"
                                        className={classes.textField}
                                        value={postId}
                                        placeholder="UUID"
                                        margin="normal"
                                        disabled
                                    ></TextField>
                                    <TextField
                                        id="title"
                                        label="Title"
                                        className={classes.textField}
                                        onChange={(evt) => this.setState({ title: evt.target.value })}
                                        placeholder="Title"
                                        value={title}
                                        margin="normal"
                                        required
                                    ></TextField>
                                    <TextField
                                        id="author"
                                        label="Author Name"
                                        className={classes.textField}
                                        placeholder="Name"
                                        margin="normal"
                                        value={author}
                                        disabled
                                    ></TextField>
                                    <TextField
                                        id="category"
                                        label="Category"
                                        className={classes.textField}
                                        value={category}
                                        disabled
                                    ></TextField>
                                    <TextField
                                        id="body"
                                        label="Body"
                                        onChange={(evt) => this.setState({ body: evt.target.value })}
                                        placeholder="Post Body"
                                        className={classes.textBody}
                                        multiline={true}
                                        value={body}
                                        rows={5}
                                        margin="normal"
                                        fullWidth
                                        required
                                    ></TextField>
                                </div>
                                :
                                <div>
                                    <TextField
                                        id="author"
                                        label="Author Name"
                                        className={classes.textField}
                                        value={commentAuthor}
                                        margin="normal"
                                        disabled
                                    ></TextField>
                                    <TextField
                                        id="uuid"
                                        label="UUID"
                                        className={classes.textField}
                                        value={commentId}
                                        placeholder="UUID"
                                        margin="normal"
                                        disabled
                                    ></TextField>
                                    <TextField
                                        id="uuid"
                                        label="Parent ID"
                                        className={classes.textField}
                                        value={postId}
                                        margin="normal"
                                        disabled
                                    ></TextField>
                                    <TextField
                                        id="body"
                                        label="Body"
                                        onChange={(evt) => this.setState({ commentBody: evt.target.value })}
                                        placeholder="Post Body"
                                        className={classes.textBody}
                                        multiline={true}
                                        value={commentBody}
                                        rows={5}
                                        margin="normal"
                                        fullWidth
                                        required
                                    ></TextField>
                                </div>}
                            <div className={classes.action}>
                                <Button variant="contained" size="medium" color="default" className={classes.iconRight} aria-label="cancel" onClick={() => this.closeModal()}>
                                    Cancel
                                </Button>
                                <Button variant="contained" size="medium" type="submit" color="primary" aria-label="Close">
                                    Update Values
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>

                <List>
                    <ListItem className={classes.flex}>
                        <div>
                            <Bookmark color="primary" />
                            <ListItemText primary={title.toUpperCase()} secondary={author} />
                            <Typography variant="subheading" className={classes.postBody}>
                                {body}
                            </Typography>
                        </div>
                        <IconButton color="inherit" aria-label="Delete" className={classes.iconButton} onClick={() => this.openModal('editPost')}>
                            <Build color="action" className={classes.edit} />
                        </IconButton>
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
                                        <ThumbUp color="action" className={classes.commentUpvote} onClick={() => setCommentVote(comment.id, "upVote")}/>
                                        <ThumbDown color="action" className={classes.commentDownvote} onClick={() => setCommentVote(comment.id, "downVote")}/>
                                        <Typography color="textSecondary" style={{ marginLeft: 15 }}>
                                            Vote Score: {comment.voteScore}
                                        </Typography>
                                        <IconButton color="inherit" aria-label="Delete" className={classes.iconButton} onClick={() => this.openModal('editComment', comment)}>
                                            <Build color="action" className={classes.edit} />
                                        </IconButton>
                                    </div>

                                </ListItem>

                            </div>
                        )
                    })) : (
                            <div>No Comments to Show.</div>
                        )}
                </List>
                <AddComment parentId={postId} />
            </div>
        )
    }
}

export default withStyles(styles)(Post);
