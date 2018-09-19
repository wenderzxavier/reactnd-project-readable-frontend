import React, { Component } from 'react';
import Navigation from "./Navigation";

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="page-section">
                    404! Page Not Found!
                </div>
            </div>
        );
    }
}

export default PageNotFound;
