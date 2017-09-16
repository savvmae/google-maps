import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon  } from 'react-materialize'

import {toggleLanding, toggleLogin, toggleRegister} from '../actions';

import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

class LandingModal extends Component {
    constructor(props) {
        super(props)
    }

    handleToggleLanding = () => {
        this.props.toggleLanding()
    }
    handleToggleLogin = () => {
        this.props.toggleLogin()
    }
    handleToggleRegister = () => {
        this.props.toggleRegister()
    }


    render() {
        const customStyles = {
            overlay: {
                backgroundColor: 'rgba(255, 255, 255, .4)'
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                border: '2px solid black',
                background: '#DDDDDD'
            }
        };
        return (
            <div>
                <ReactModal style={customStyles} header='landing Header'
                    isOpen={this.props.state.showLandingModal}
                    contentLabel="Minimal Modal Example">
                    {this.props.state.landing
                        ?
                        <div>
                    <p className="thick big"> Welcome to Free parking spot finder! You may continue anonymously, but with limited features. Or you can login/register below </p>
                    <div className="row">
                        <button className="btn co waves-effect waves-light z-zero " onClick={this.handleToggleLanding}>Continue Without Logging in</button>
                    </div>
                    </div>
                    : <div><p className="thick big"> You have unlocked a premium feature! If you wish to access this feature, please login or register! </p>
                    <div className="row">
                        <button className="btn co waves-effect waves-light z-zero " onClick={this.handleToggleLanding}>Continue Without Features</button>
                    </div> </div> }
                    <div className="row">
                        <button className="btn co waves-effect waves-light z-zero  margy-r" onClick={this.handleToggleLogin}>Login</button>
                        <button className="btn co waves-effect waves-light z-zero" onClick={this.handleToggleRegister}>Register</button></div>
                </ReactModal>
                {this.props.state.showLoginModal

                    ? <LoginModal />
                    : null}
                {this.props.state.showRegisterModal

                    ? <RegisterModal />
                    : null}

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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingModal)
