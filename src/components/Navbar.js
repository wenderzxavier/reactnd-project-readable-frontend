import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../logo.svg';
import { getAllCat } from '../utils/ReadableAPI'
import '../styles/App.css';
import PropTypes from 'prop-types';

const styles = {
  flex: {
    flexGrow: 1,
  }
}

class Navbar extends Component {

  state = {
    categories: {}
  }

  componentWillMount() {
    getAllCat().then((res) => {
      this.setState({
        categories: res
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { categories } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <img src={logo} className="App-logo d-inline-block align-top" width="60" alt="logo" />
            <Typography variant="title" color="inherit" className={classes.flex}>
              React Forums
            </Typography>
            <Button color="inherit">Home</Button>
            {categories.length > 0 ?
              (categories.map((item, key) => {
                return (
                  <Button key={key} color="inherit" >{item.name}</Button>
                )
              }))
              :
              (<Typography variant="title" color="inherit">No categories available.</Typography>)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar);