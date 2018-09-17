import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Navigation from './Navigation'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addPostRedux } from '../actions'
import uuidv3 from 'uuid';

class AddPost extends React.Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: '',
        titleValid: false,
        bodyValid: false,
        authorValid: false,
        categoryValid: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const post = this.state
        post.timestamp = Date.now()
        post.id = uuidv3();
        post.voteScore = 0;
        const valid = this.state.titleValid && this.state.bodyValid && this.state.authorValid && this.state.categoryValid;
        if(valid) {
            this.props.dispatch(addPostRedux(post));
            this.props.history.push("/")
        }
    }
    handleTitleChange = (e) => {
        if(e.target.value) {
            this.setState({
                title: e.target.value,
                titleValid: true
            })
        }
        else {
            this.setState({
                title: e.target.value,
                titleValid: false
            })
        }
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
    handleAuthorChange = (e) => {
        if(e.target.value) {
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
    handleCategoryChange = (e) => {
        if(e.target.value) {
            this.setState({
                category: e.target.value,
                categoryValid: true
            })
        }
        else {
            this.setState({
                category: e.target.value,
                categoryValid: false
            })
        }
    }
    render() {
        let { categories } = this.props
        return (
            <div>
                <Navigation />
                <div className="page-section">
                    <div className="page-top">
                        <h1 className="page-header">Add a Post</h1>
                    </div>
                    <Form className="post-form" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title" className="label-name">Title</Label>
                            <Input valid={this.state.titleValid} type="text" name="title" id="title" placeholder="Enter title" value={this.state.title} onChange={this.handleTitleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="body" className="label-name">Body</Label>
                            <Input valid={this.state.bodyValid} type="textarea" name="body" id="body" placeholder="Enter text" value={this.state.body} onChange={this.handleBodyChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="body" className="label-name">Author</Label>
                            <Input valid={this.state.authorValid} type="text" name="author" id="author" placeholder="Enter author name" value={this.state.author} onChange={this.handleAuthorChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="categorySelect" className="label-name">Category</Label>
                                <Input valid={this.state.categoryValid} type="select" name="select" id="categorySelect" value={this.state.category} onChange={this.handleCategoryChange}>
                                    <option></option>
                                    {categories && categories.map(function (category) {
                                        return (<option key={category.name}>{category.name}</option>)
                                    })}
                                </Input>
                        </FormGroup>

                        <Button id="form-submit-btn">Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(data) {
    if (data.categories) {
        return {
            categories: data.categories.categories
        }
    }
    else {
        return {
            categories: data.categories
        }
    }
}

export default withRouter(connect(mapStateToProps)(AddPost))