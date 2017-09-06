import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Row, Input, Link, Card, Col, Button, Icon } from 'react-materialize'
import {toggleSpotDetailModal} from '../actions'

class SpotDetail extends Component {

    handleChange = (e) => {
        if (e.target.checked) {
            this.setState({ [e.target.name]: e.target.checked })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    handleSubmit = (e) => {

    }

    render() {
        const customStyles = {
            overlay: {
                backgroundColor: 'rgba(255, 255, 255)'
            },
            content: {
                top: '75%',
                left: '80%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };

        return (
            
            <div>
                <ReactModal style={customStyles} header='SPOT DETAILS'
                    isOpen={this.props.state.showSpotDetailModal} contentLabel="spot">
                    <Button floating icon='close' onClick={this.props.toggleSpotDetailModal} className='red' large style={{ bottom: '0px', left: '45%' }} />

                    <p>  Details about the spot! </p>
                    <div className="row">
                        <form onSubmit={this.handleSubmit} className="col s12">
                            <div className="row">

                                <div className="input-field col s6">
                                    <input onChange={this.handleChange} type="text" name="spotType" className="validate" value={this.props.state.currentSpot.details.spotType} />
                                    
                                </div>
                                <div className="input-field col s6">
                                    <input onChange={this.handleChange} type="text" name="spotNotes" value={this.props.state.currentSpot.details.spotNotes} className="validate" />
                                    
                                </div>
                                <Input onChange={this.handleChange} checked={this.props.state.currentSpot.details.isSpotTaken} name='group1' type='checkbox' label='Taken?' />
                            </div>
                            <div className="row">
                                <button className="btn waves-effect waves-light" type="submit">Update Spot!
                            <i className="material-icons right">send</i>
                                </button>
                                <button className="btn waves-effect waves-light" type="submit">Delete Spot!
                            <i className="material-icons right">close</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        );
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail)

