import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import Navigation from './Navigation';
import Comments from './Comments'
import AddComment from './AddComment'
import { withRouter, Link } from 'react-router-dom'
import { updateVote, getAllComments, deletePostRedux } from '../actions'


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
                        <h1 className="page-header">Detailed Post View</h1>
                    </div>
                    <Card className="detailed-post">
                        <CardHeader className="post-card-header">
                            <span>{post.category}</span>
                            <div className="detailed-post-top-buttons">
                                <Link to={`/${post.category}/${post.id}/edit`}><Button color="secondary" size="sm">Edit</Button></Link>
                                <Button color="secondary" size="sm" className="delete-post-btn" onClick={() => this.deletePost(post.id)}>Delete</Button>
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
                                <Button className="up-vote" onClick={() => this.vote(post.id, "upVote")}>Upvote</Button>
                                <Button className="down-vote" onClick={() => this.vote(post.id, "downVote")}>Downvote</Button>
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
