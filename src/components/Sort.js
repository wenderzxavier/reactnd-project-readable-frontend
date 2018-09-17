import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux'
import { changeSort } from '../actions'

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    sortChange() {
        this.props.sort === "score" ? this.props.dispatch(changeSort("time")) : this.props.dispatch(changeSort("score"))
    }

    render() {
        const { sort } = this.props
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Sort By
                </DropdownToggle>
                <DropdownMenu>
                    {(sort === "time") ? (
                        <DropdownItem active>Time</DropdownItem>
                    ) : (
                            <DropdownItem onClick={() => this.sortChange()}>Time</DropdownItem>
                        )}
                    <DropdownItem divider />
                    {(sort === "score") ? (
                        <DropdownItem active>Score</DropdownItem>
                    ) : (
                            <DropdownItem onClick={() => this.sortChange()}>Score</DropdownItem>
                        )}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }
}

function mapStateToProps(data) {
    return {
        sort: data.sort.sortValue
    }
}

export default connect(mapStateToProps)(Sort)