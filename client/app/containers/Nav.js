import { Navbar, NavItem } from 'react-materialize';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions'

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    handleLogout = (event) => {
        event.preventDefault();
        this.props.logout();
    }

    render() {
        return (
            <Navbar className="co-n thick" brand={this.props.state.user} left>
                <NavItem className="thick" onClick={this.handleLogout}>Logout</NavItem>
            </Navbar>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            return dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)