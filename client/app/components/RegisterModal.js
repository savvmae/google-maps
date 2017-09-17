import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon } from 'react-materialize'
import { connect } from 'react-redux'

import { toggleRegister, register, setError } from '../actions';


class RegisterModal extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        }
    }
    updateState = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            this.props.register(this.state);
        } else {
            this.props.setError('passwords do not match')
        }
    }

    render() {
        const customStyles = {
            overlay: {
                backgroundColor: 'rgba(255, 255, 255, 0)'
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
            <ReactModal style={customStyles} header='register Header'
                isOpen={this.props.state.showRegisterModal}
                contentLabel="Minimal Modal Example">
                <Button onClick={this.props.toggleRegister} floating icon='close' className='co-b' large style={{ top: '0px', left: '45%' }} />
                <div className="container container-fifty">
                    <Col m={6} s={12}>
                        <Card>
                            {this.props.state.errorMessage ?
                                <div className="row thick big">
                                    {this.props.state.errorMessage}
                                </div>
                                : null}
                            <div className="card-image">
                                <img src="./lot.jpg" />
                            </div>
                            <div className="row no-m">
                                <form onSubmit={this.handleSubmit} className="col s12">
                                    <div className="row">

                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">mail</i>
                                            <input onChange={this.updateState} id="icon_telephone" type="email" name="email" className="validate blue-grey-text" />
                                            <label className="blue-grey-text" htmlFor="icon_telephone" >Email</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">textsms</i>
                                            <input onChange={this.updateState} id="icon_telephone" type="text" name="username" className="validate blue-grey-text" />
                                            <label className="blue-grey-text" htmlFor="icon_telephone" >Username</label>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">lock</i>
                                            <input onChange={this.updateState} id="icon_prefix" type="password" name="password" className="validate blue-grey-text" />
                                            <label className="blue-grey-text" htmlFor="icon_prefix">Password</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">lock</i>
                                            <input onChange={this.updateState} id="icon_prefix" type="password" name="confirmPassword" className="validate blue-grey-text" />
                                            <label className="blue-grey-text" htmlFor="icon_prefix">Confirm Password</label>
                                        </div>

                                    </div>
                                    <div className="row no-m">
                                        <button className="btn waves-effect waves-light co" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </Col>
                </div>

            </ReactModal>
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
        register: (user) => {
            return dispatch(register(user))
        },
        toggleRegister: () => {
            return dispatch(toggleRegister())
        },
        setError: (err) => {
            return dispatch(setError(err))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)