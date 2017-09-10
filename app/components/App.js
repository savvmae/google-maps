import React, { Component } from 'react';
import { connect } from 'react-redux'
import { render } from 'react-dom';
import GMap from './GMap';
import LandingModal from './LandingModal';
import MarkerModal from './MarkerModal';
import Nav from './Nav'



class App extends Component {
    constructor(props) {
        super(props)
    }

    // componentWillMount = () => {
    //     this.props.dashboard()
    // }

    render() {
        return (
            <div className="b-g">
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
        toggleLanding: () => {
            return dispatch(toggleLanding())
        },
        toggleRegister: () => {
            return dispatch(toggleRegister())
        },
        toggleLogin: () => {
            return dispatch(toggleLogin())
        }
        // dashboard: () => {
        //     return dispatch(dashboard())
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
