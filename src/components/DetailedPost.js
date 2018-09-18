import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import Navigation from './Navigation';
import Comments from './Comments'
import AddComment from './AddComment'
import { withRouter, Link } from 'react-router-dom'
import { updateVote, getAllComments, deletePostRedux } from '../actions'
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Delete from '@material-ui/icons/HighlightOff';
import Edit from '@material-ui/icons/Build'

class DetailedPost extends Component {

    state = {
        post: {}
    }

    componentWillMount () {

        const matchId = (element) => element.id === this.props.value

        this.setState({
            post: this.props.posts.find(matchId)
        })

        this.props.dispatch(getAllComments(this.props.value))
    }
    vote (id, option) {
        this.props.dispatch(updateVote(id, option))
    }
    deletePost(id) {
        this.props.dispatch(deletePostRedux(id))
        this.props.history.push("/")
    }
    render() {
        const { post } = this.state
        return (
            <div>
                <Navigation />
                <div className="page-section">
                    <div className="page-top">
                        <h1 className="page-header">Post #{post.id}</h1>
                    </div>
                    <Card className="detailed-post" >
                        <CardHeader>
                        <span>{post.category}</span>
                            <div className="detailed-post-top-buttons">
                                <Link to={`/${post.category}/${post.id}/edit`}>
                                <Button color="warning" size="sm">
                                    <Edit /> Edit
                                </Button>
                                </Link>
                                <Button color="danger" size="sm" className="delete-post-btn" onClick={() => this.deletePost(post.id)}>
                                    <Delete />Delete
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="title-area">
                                <CardTitle>{post.title} <span className="author">by {post.author}</span></CardTitle>
                                <span className="card-time"><Timestamp time={post.timestamp} /></span>
                            </div>
                            <CardText>{post.body}</CardText>
                        </CardBody>
                        <CardFooter>
                            <span className="total-comments">{post.commentCount} Comment(s)</span>
                            <div className="vote-controls">
                                <Button variant="extendedFab" onClick={() => this.vote(post.id, "upVote")} color="info" aria-label="Delete" className="post-button">
                                    <ThumbUp /> UpVote
                                </Button>
                                <Button variant="extendedFab" onClick={() => this.vote(post.id, "downVote")} color="danger" aria-label="Delete" className="post-button">
                                    <ThumbDown /> DownVote
                                </Button>
                                <span className="post-score">Score: {post.voteScore}</span>
                            </div>
                        </CardFooter>
                    </Card>
                    <Comments/>
                    <AddComment postId={post.id} />
                </div>
            </div>
        )
    }
};

function mapStateToProps(data) {
    return {
        comments: data.comments,
        posts: data.posts
    }
}
export default withRouter(connect(mapStateToProps)(DetailedPost))
