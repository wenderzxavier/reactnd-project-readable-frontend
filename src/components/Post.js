import React, { Component } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { withRouter, Link } from 'react-router-dom'
import { updateVote, fetchComments, fetchPosts, deletePostRedux } from '../Actions'

class Post extends Component {
    componentWillMount() {
        this.props.dispatch(fetchPosts())
        this.props.dispatch(fetchComments())
    }

    vote(id, option) {
        this.props.dispatch(updateVote(id, option))
    }

    deletePost(id) {
        this.props.dispatch(deletePostRedux(id))
    }

    render() {
        const { posts } = this.props
        return (
            <div>
                {(posts) ? (posts.map((post) => (
                    <Card key={post.id}>
                        <CardHeader className="post-card-header">
                            <span>{post.category}</span>
                            <div>
                                <Link to={`/${post.category}/${post.id}/edit`}><Button color="secondary" size="sm">Edit</Button></Link>
                                <Button color="secondary" size="sm" className="delete-post-btn" onClick={() => this.deletePost(post.id)}>Delete</Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Link className="post-link" to={`/${post.category}/${post.id}`}>
                                <div className="title-area">
                                    <CardTitle>{post.title} <span className="author">by {post.author}</span></CardTitle>
                                    <span className="card-time"><Timestamp time={post.timestamp} /></span>
                                </div>
                                <CardText>{post.body}</CardText>
                            </Link>
                        </CardBody>
                        <CardFooter>
                            <div className="vote-controls">
                                <Button className="up-vote" onClick={() => this.vote(post.id, "upVote")}>Upvote</Button>
                                <Button className="down-vote" onClick={() => this.vote(post.id, "downVote")}>Downvote</Button>
                                <span className="post-score">Vote Score: {post.voteScore}</span>
                            </div>
                            <Link className="post-link" to={`/${post.category}/${post.id}`}><span className="total-comments">{post.commentCount} Comment(s)</span></Link>
                        </CardFooter>
                    </Card>))) : (<h1>No posts to show</h1>)}
            </div>
        )
    }
};

function mapStateToProps(data, ownProps) {
    let postsData = []
    if (data.posts) {
        postsData = data.posts

        if (ownProps.category) {
            postsData = postsData.filter((post) => post.category === ownProps.category).sort(function (a, b) {
                if (data.sort.sortValue === "time") {
                    return b.timestamp - a.timestamp
                }
                else {
                    return b.voteScore - a.voteScore;
                }
            })
        }
        else {
            postsData = postsData.sort(function (a, b) {
                if (data.sort.sortValue === "time") {
                    return b.timestamp - a.timestamp
                }
                else {
                    return b.voteScore - a.voteScore;
                }
            })
        }
    }
    return {
        posts: postsData,
        sort: data.sort.sortValue
    }
}

export default withRouter(connect(mapStateToProps)(Post))
