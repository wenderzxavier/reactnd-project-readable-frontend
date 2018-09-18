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
        if(this.props.sort === "score") {
            this.props.dispatch(changeSort("time"))
        }
        else {
            this.props.dispatch(changeSort("score"))
        }
    }

    render() {
        const {sort} = this.props
        return (
            <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="info">
                    Sort By
                </DropdownToggle>
                <DropdownMenu>
                    {(sort === "time")?(
                        <DropdownItem active>Date</DropdownItem>
                    ):(
                        <DropdownItem onClick={() => this.sortChange()}>Date</DropdownItem>
                    )}
                    <DropdownItem divider />
                    {(sort === "score")?(
                        <DropdownItem active>Vote Score</DropdownItem>
                    ):(
                        <DropdownItem onClick={() => this.sortChange()}>Vote Score</DropdownItem>
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