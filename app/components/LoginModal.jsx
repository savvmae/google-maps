import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col } from 'react-materialize'


export default class LoginModal extends Component {
    constructor(){
        super()

        this.state = {
            showModal: true
        }
    }

    render() {
        return (
            <ReactModal header='login Header'
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"> 
                    <div className="container container-fifty">
                        <Col m={6} s={12}>
                            <Card>
                                <div className="card-image">
                                <img src="./register.jpeg" />
                                </div>
                                <div className="row">
                                    <form onSubmit={this.handleSubmit} className="col s12">
                                        <div className="row">
                                            
                                            <div className="input-field col s6">
                                                <i className="material-icons prefix">mail</i>
                                                <input onChange={this.updateState} id="icon_telephone" type="email" name="email" className="validate" />
                                                <label htmlFor="icon_telephone" >Email</label>
                                            </div>
                                            <div className="input-field col s6">
                                                <i className="material-icons prefix">lock</i>
                                                <input onChange={this.updateState} id="icon_prefix" type="password" name="password" className="validate" />
                                                <label htmlFor="icon_prefix">Password</label>
                                            </div>
                                        </div>
                                         <div className="row">
                                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Card>
                        </Col>
                    </div>
                    <button onClick={this.props.handleCloseModal}>Close</button>
                    </ReactModal>
        )
    }
}