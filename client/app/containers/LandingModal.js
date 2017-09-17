import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon } from 'react-materialize'

import { toggleLanding, toggleLogin, toggleRegister } from '../actions';

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
                            <p className="thick x-big no-m"> Welcome to Park It - A free parking spot finder!</p><p className="thick big"> login/register below to access premium features </p>
                            <div className="row margyy-t">
                                <button className="btn co waves-effect waves-light z-zero  margy-r" onClick={this.handleToggleLogin}>Login</button>
                                <button className="btn co waves-effect waves-light z-zero" onClick={this.handleToggleRegister}>Register</button></div>
                            <div className="row">
                                <button className="btn co waves-effect waves-light z-zero " onClick={this.handleToggleLanding}>Continue Anonymously</button>
                            </div>
                        </div>
                        : <div><p className="thick x-big"> You have unlocked a premium feature! </p><p className="thick big"> If you wish to access this feature, please login or register! </p>
                            <div className="row margyy-t">
                                <button className="btn co waves-effect waves-light z-zero  margy-r" onClick={this.handleToggleLogin}>Login</button>
                                <button className="btn co waves-effect waves-light z-zero" onClick={this.handleToggleRegister}>Register</button></div>
                            <div className="row">
                                <button className="btn co waves-effect waves-light z-zero " onClick={this.handleToggleLanding}>Continue Without Features</button>
                            </div> </div>}
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
