import React, { Component } from 'react';
import CardGrid from '../components/CardGrid';
import NavBar from '../components/Navbar';

class Category extends Component{
    render() {
        return(
            <div>
                <NavBar>
                    <CardGrid></CardGrid>
                </NavBar>
            </div>
        )
    }
}

export default Category;