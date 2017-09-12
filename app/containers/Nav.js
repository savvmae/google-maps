import { Navbar, NavItem } from 'react-materialize';
import React, { Component } from 'react';
import { connect } from 'react-redux'

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Navbar className="co-n" brand={this.props.state.user.name} left>
                <NavItem href='components.html'>Logout</NavItem>
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
        toggleSpotDetailModal: () => {
            return dispatch(toggleSpotDetailModal())
        },
        toggleRestrictedModal: () => {
            return dispatch(toggleRestrictedModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)