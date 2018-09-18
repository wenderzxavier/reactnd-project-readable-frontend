import React, { Component } from 'react';
import { Card, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { withRouter, Link } from 'react-router-dom'
import { updateVote, fetchC, fetchP, deletePostRedux } from '../actions'

class Post extends Component {
    componentWillMount () {
        this.getData()
    }
    getData = () => {
        this.props.dispatch(fetchP())
        this.props.dispatch(fetchC())
    }
    vote (id, option) {
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
                                <span className="post-score">Score: {post.voteScore}</span>
                            <Link className="post-link" to={`/${post.category}/${post.id}`}><span className="total-comments">{post.commentCount} Comment(s)</span></Link>
                        </CardFooter>
                    </Card>))) : (<h1>No posts to show</h1>)}
            </div>
        )
    }
};

function mapStateToProps(data, ownProps) {
    let postsData = []
    if(data.posts) {
        postsData = data.posts

        if(ownProps.category) {
            postsData = postsData.filter((post) => post.category === ownProps.category ).sort(function (a, b) {
                if(data.sort.sortValue === "time") {
                    return b.timestamp - a.timestamp
                }
                else {
                    return b.voteScore - a.voteScore;
                }
            })
        }
        else {
            postsData = postsData.sort(function (a, b) {
                if(data.sort.sortValue === "time") {
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
