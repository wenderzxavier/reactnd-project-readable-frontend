import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-modal';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/HighlightOff';
import { addPost } from '../utils/ReadableAPI';
import { Typography } from '@material-ui/core';


const styles = theme => ({
    iconAdd: {
        position: 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },

    action: {
        position: 'absolute',
        bottom: theme.spacing.unit * 4,
        right: theme.spacing.unit * 4,
    },

    iconRight: {
        marginRight: 12,
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

    menu: {
        width: 300
    },

    title: {
        margin: 25,
        fontSize: 30,
        fontFamily: 'Raleway' 
    }
})


class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        modalIsOpen: false,
        uuid: "",
        category: "",
        body: "",
        title: "",
        author: "",
        parentId: "",
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true,
            uuid: uuidv3(),
            category: "react",
            body: "",
            title: "",
            author: "",
            parentId: "",
        })
    }

    handleSubmit = (evt) => {
        if(!evt.target.checkValidity()){
            alert('Some fields are missing or contain invalid data. Try again!')
            this.closeModal();
        }
        evt.preventDefault();
/*        addPost({
            id: this.state.uuid,
            timestamp: Date.now(),
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.state.category
        });*/
        console.log("Enviando Post");
        this.closeModal();
    }

    closeModal = () => {
        this.setState({
            modalIsOpen: false,
        })
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    render() {
        const { classes } = this.props;
        const { modalIsOpen, uuid } = this.state;
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
                            Add New Post
                        </Typography>
                        <Button variant="fab" color="default" className={classes.iconClose} aria-label="Close" onClick={() => this.closeModal()}>
                            <CloseIcon />
                        </Button>
                    </div>
                    <div>
                        <form id="addPostForm" className={classes.container} action="/" autoComplete="off" method="POST" onSubmit={(evt) => { this.handleSubmit(evt) }}>
                            <TextField
                                id="uuid"
                                label="UUID"
                                className={classes.textField}
                                value={uuid}
                                placeholder="UUID"
                                margin="normal"
                                disabled
                            ></TextField>
                            <TextField
                                id="author"
                                label="Author Name"
                                className={classes.textField}
                                onChange={(evt) => this.setState({ author: evt.target.value })}
                                placeholder="Name"
                                margin="normal"
                                required
                            ></TextField>
                            <TextField
                                id="title"
                                label="Title"
                                className={classes.textField}
                                onChange={(evt) => this.setState({ title: evt.target.value })}
                                placeholder="Title"
                                margin="normal"
                                required
                            ></TextField>
                            <TextField
                                id="category"
                                select
                                label="Category"
                                onChange={(evt) => this.setState({ category: evt.target.value })}
                                className={classes.textField}
                                SelectProps={{
                                    native: true,
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Select the category"
                                margin="normal"
                            >
                                {['react', 'redux', 'udacity'].map((option, key) => (
                                    <option key={key} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                id="body"
                                label="Body"
                                onChange={(evt) => this.setState({ body: evt.target.value })}
                                placeholder="Post Body"
                                className={classes.textBody}
                                multiline={true}
                                rows={5}
                                margin="normal"
                                fullWidth
                                required
                            ></TextField>
                            <div className={classes.action}>
                                <Button variant="contained" size="medium" color="default" className={classes.iconRight} aria-label="cancel" onClick={() => this.closeModal()}>
                                    Cancel
                                </Button>
                                <Button variant="contained" size="medium" type="submit" color="primary" aria-label="Close">
                                    Create Post
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <Button variant="fab" color="primary" className={classes.iconAdd} aria-label="Add" onClick={() => this.openModal()}>
                    <AddIcon />
                </Button>
            </div >
        )
    }
}

export default withStyles(styles)(Modal);