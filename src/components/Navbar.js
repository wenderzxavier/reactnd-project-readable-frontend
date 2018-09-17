import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, Nav } from 'reactstrap';
import { connect } from 'react-redux'
import  { Link } from 'react-router-dom'
import logo from '../logo.svg';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const { categories } = this.props
        const selected = this.props.value
        return (
            <div className="nav-class">
                <NavigationBar color="faded" light expand="md">
                    <Link to="/" className="navbar-brand">
                    <img src={logo} className="App-logo" width="60" alt="logo" />
                    React Forums
                    </Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {(categories)&&(categories.map(function (category) {
                                if(selected === category.name) {
                                    return (
                                        <Link
                                            to={`/${category.path}`}
                                            className="nav-link active"
                                            key={category.name}>
                                            {category.name}
                                        </Link>
                                    )
                                }
                                else {
                                    return (
                                        <Link
                                            to={`/${category.path}`}
                                            className="nav-link"
                                            key={category.name}>
                                            {category.name}
                                        </Link>
                                    )
                                }
                            }))}
                        </Nav>
                    </Collapse>
                </NavigationBar>
            </div>
        );
    }
}

function mapStateToProps(data) {
    if(data.categories) {
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

export default connect(mapStateToProps)(NavigationBar)