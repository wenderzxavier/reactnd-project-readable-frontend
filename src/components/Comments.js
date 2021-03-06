import React from 'react';
import { Card, Button, CardBody, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { withRouter } from 'react-router-dom';
import { updateCommentVote, deleteCommentRedux } from '../actions'
import EditModal from './EditModal';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Delete from '@material-ui/icons/HighlightOff';

class Comments extends React.Component {

    vote(id, option) {
        this.props.dispatch(updateCommentVote(id, option))
    }
    commentDelete(id) {
        this.props.dispatch(deleteCommentRedux(id))
    }

    render() {
        const { comments } = this.props
        return (
            <div>
                {(comments) && (comments.map((comment) => (
                    <Card key={comment.id} className="comment-card">
                        <CardBody>
                            <div className="comments-top">
                                <div className="comment-space">
                                    <CardText>{comment.body}</CardText>
                                    <span className="author">by {comment.author}</span>
                                    <EditModal comment={comment} />
                                </div>
                                <span className="card-time"><Timestamp time={comment.timestamp} /></span>
                            </div>
                            <div className="comment-buttons">
                                <span className="comment-score">Score: {comment.voteScore}</span>
                                <Button size="sm" className="comment-button" onClick={() => this.vote(comment.id, "upVote")}>
                                    <ThumbUp />Upvote
                                    </Button>
                                <Button size="sm" className="comment-button" onClick={() => this.vote(comment.id, "downVote")}>
                                    <ThumbDown /> Downvote
                                        </Button>
                                <Button size="sm" className="comment-button" onClick={() => this.commentDelete(comment.id)}>
                                    <Delete />
                                    Delete
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                )))}
            </div>
        );
    }
};

function mapStateToProps(data) {
    let comments = data.comments
    return {
        comments
    }
}

export default withRouter(connect(mapStateToProps)(Comments));