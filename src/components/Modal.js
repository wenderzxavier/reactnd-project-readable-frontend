import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateCommentRedux } from '../actions'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Card, Input, Label } from 'reactstrap';

class EditCommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            body: this.props.comment.body,
            bodyValid: true,
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleBodyChange = (e) => {
        if(e.target.value) {
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
    handleSubmit = (e) => {
        e.preventDefault()
        const comment = {
            body: this.state.body,
            timestamp: Date.now()
        }
        const valid = this.state.bodyValid
        if(valid) {
            this.props.dispatch(updateCommentRedux(this.props.comment.id, comment));
            this.toggle();
        }
    }

    render() {
        const { comment } =this.props
        return (
            <div>
                <Button size="sm" className="comment-edit-btn" onClick={this.toggle}>Edit</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Comment</ModalHeader>
                    <ModalBody>
                        <Card className="comment-card">
                            <Form className="comment-form" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="body" className="label-name">Body</Label>
                                    <Input valid={this.state.bodyValid} type="textarea" name="body" id="body" placeholder="Enter comment" value={this.state.body} onChange={this.handleBodyChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="author" className="label-name">Author</Label>
                                    <Input disabled type="text" name="author" id="author" placeholder="Enter author name" value={comment.author}  />
                                </FormGroup>
                                <Button id="form-submit-btn">Update Comment</Button>
                            </Form>
                        </Card>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(connect()(EditCommentModal));