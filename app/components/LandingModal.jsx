import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col } from 'react-materialize'

import LoginModal from './LoginModal.jsx';
import RegisterModal from './RegisterModal.jsx';

export default class Landing extends Component {
    constructor() {
        super()
        this.state = {
            showLandingModal: true,
            showLoginModal: false,
            showRegModal: false,
            email: '',
            password: ''
        };
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.openLogin = this.openLogin.bind(this);
        this.openRegister = this.openRegister.bind(this);
    }

    handleOpenModal() {
        this.setState({ showLandingModal: true });
    }

    handleCloseModal() {
        if (this.state.showLoginModal) {
        this.setState({ showLoginModal: false });
        } else if (this.state.showRegModal) {
            this.setState({ showRegModal: false})
        } else {
            this.setState({ showLandingModal: false})
        }
    }
    openLogin() {
        this.setState({showLoginModal: true})
    }
    openRegister() {
        this.setState({showRegModal: true})
    }


    render() {
        return (
            <div>
                <ReactModal header='landing Header'
                    isOpen={this.state.showLandingModal}
                    contentLabel="Minimal Modal Example">
                     <p> Welcome to Free parking spot finder! You may continue anonymously, but with limited features. Or you can login/register below </p>
                     
                    <button onClick={this.handleCloseModal}>Continue Without Logging in</button>
                    <button onClick={this.openLogin}>Login</button>
                    <button onClick={this.openRegister}>Register</button>
                </ReactModal>
                {this.state.showLoginModal
    
                ? <LoginModal handleCloseModal={this.handleCloseModal.bind(this)}/>
                : null }
                {this.state.showRegModal
    
                ? <RegisterModal handleCloseModal={this.handleCloseModal.bind(this)} />
                : null }
                
            </div>
        )
    }
}