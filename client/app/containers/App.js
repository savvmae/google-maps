import React, { Component } from 'react';
import { connect } from 'react-redux'
import { render } from 'react-dom';
import GMap from '../components/GMap';
import LandingModal from '../containers/LandingModal';
import MarkerModal from '../containers/MarkerModal';
import Nav from '../containers/Nav'

import { dashboard } from '../actions'


class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount = () => {
        this.props.dashboard();
    }

    render() {
        return (
            <div className='full'>
                {this.props.state.loggedIn
                    ?
                    <Nav />
                    : null}

                {this.props.state.showLandingModal
                    ?
                    <LandingModal />
                    : null}
                <div className="mapContainer margy-t">
                    {this.props.state.showMarkerModal
                        ?
                        <MarkerModal />
                        : null}
                    <GMap />

                </div>
            </div>
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
        dashboard: () => {
            return dispatch(dashboard())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
