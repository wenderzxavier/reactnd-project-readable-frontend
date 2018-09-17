import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Card } from 'reactstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addCommentRedux } from '../actions'
import uuidv3 from 'uuid';

class AddComment extends Component {
    state = {
        body: '',
        author: '',
        bodyValid: false,
        authorValid: false,
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const comment = this.state
        comment.timestamp = Date.now()
        comment.id = uuidv3();
        comment.parentId = this.props.postId
        const valid = this.state.bodyValid && this.state.authorValid;
        if (valid) {
            this.props.dispatch(addCommentRedux(comment));
            this.setState({
                body: '',
                author: '',
                bodyValid: false,
                authorValid: false
            })
        }
    }
    handleBodyChange = (e) => {
        if (e.target.value) {
            this.setState({
                body: e.target.value,
                bodyValid: true
            })
        }
        else {
            this.setState({
                body: e.target.value,
                bodyValid: false
            })
        }
    }
    handleAuthorChange = (e) => {
        if (e.target.value) {
            this.setState({
                author: e.target.value,
                authorValid: true
            })
        }
        else {
            this.setState({
                author: e.target.value,
                authorValid: false
            })
        }
    }
    render() {
        return (
            <div>
                <Card className="comment-card">
                    <Form className="comment-form" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input valid={this.state.bodyValid} type="textarea" name="body" id="body" placeholder="Enter comment" value={this.state.body} onChange={this.handleBodyChange} />
                        </FormGroup>
                        <FormGroup>
                            <Input valid={this.state.authorValid} type="text" name="author" id="author" placeholder="Enter author name" value={this.state.author} onChange={this.handleAuthorChange} />
                        </FormGroup>
                        <Button id="form-submit-btn">Add Comment</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}


export default withRouter(connect()(AddComment))