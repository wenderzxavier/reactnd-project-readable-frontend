import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-modal';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/HighlightOff';
import uuidv3 from 'uuid';
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
        margin: 15,
        size: 15,
    }
})


class AddPost extends Component {
    state = {
        modalIsOpen: false,
        uuid: "",
        category: "",
        body: "",
        title: "",
        author: "",

    }

    openModal = () =>{
        this.setState({
            modalIsOpen: true,
            uuid: uuidv3(),
            category: "react",
            body: "",
            title: "",
            author: ""
        })
    }

    closeModal = () =>{
        this.setState({
            modalIsOpen: false,
        })
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    render() {
        const { classes } = this.props;
        const { modalIsOpen, uuid, author, title, category, body } = this.state;
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
                        <form className={classes.container} autoComplete="off">
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
                                onChange={(evt) => this.setState({ author : evt.target.value })}
                                placeholder="Name"
                                margin="normal"
                                required
                            ></TextField>
                            <TextField
                                id="title"
                                label="Title"
                                className={classes.textField}
                                onChange={(evt) => this.setState({ title : evt.target.value })}
                                placeholder="Title"
                                margin="normal"
                                required
                            ></TextField>
                            <TextField
                                id="category"
                                select
                                label="Category"
                                onChange={(evt) => this.setState({ category : evt.target.value })}
                                className={classes.textField}
                                //                            value={this.state.currency}
                                //                            onChange={this.handleChange('currency')}
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
                                onChange={(evt) => this.setState({ body : evt.target.value })}
                                placeholder="Post Body"
                                className={classes.textBody}
                                multiline={true}
                                rows={5}
                                margin="normal"
                                fullWidth
                                required
                            ></TextField>
                        </form>
                    </div>
                    <div className={classes.action}>
                        <Button variant="contained" size="medium" color="default" className={classes.iconRight} aria-label="cancel" onClick={() => this.closeModal()}>
                            Cancel
                        </Button>
                        <Button variant="contained" size="medium" type="submit" color="primary" aria-label="Close" onClick={() => {
                            const date = Date.now();
                            addPost({id: uuid, timestamp: date, title: title, body: body, author: author, category: category}).then((rep) => console.log(rep))
                            this.closeModal()
                        }}>
                            Create Post
                        </Button>
                    </div>
                </Modal>
                <Button variant="fab" color="primary" className={classes.iconAdd} aria-label="Add" onClick={() => this.openModal()}>
                    <AddIcon />
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(AddPost);