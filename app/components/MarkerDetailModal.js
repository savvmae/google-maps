import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon } from 'react-materialize'

import { toggleMarkerDetailModal, submitNewSpot } from '../actions';


class MarkerDetailModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            spotType: null,
            isSpotTaken: false,
            spotNotes: null,
            lat: this.props.state.spotDetails.lat,
            lng: this.props.state.spotDetails.lng
        }
    }

    updateState = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    updateCheck = (event) => {
        this.setState({isSpotTaken: event.target.checked})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitNewSpot(this.state);
        this.props.addMarkerClick(this.props.currentMarker, this.state)
        // would need to make sure this comes back successful, then add onclick
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
                transform: 'translate(-50%, -50%)',
                border: '2px solid black',
                background: '#DDDDDD'
            }
        };
        return (
            <div>
                <ReactModal style={customStyles} header='Marker Info Header'
                    isOpen={this.props.state.showMarkerDetailModal}
                    contentLabel="Minimal Modal Example">
                    <Button onClick={this.props.toggleMarkerDetailModal} floating icon='close' className='co-b' large style={{ bottom: '0px', left: '45%' }} />

                    <p className="thick big">  Details about the spot! </p>
                    <div className="row">
                        <form onSubmit={this.handleSubmit} className="col s12">
                            <div className="row">

                                <div className="input-field col s6">
                                    <input onChange={this.updateState} type="text" name="spotType" className="blue-grey-text" />
                                    <label className="blue-grey-text" htmlFor="icon_telephone" >Type of Spot:</label>
                                </div>
                                <div className="input-field col s6">
                                    <input onChange={this.updateState} type="text" name="spotNotes" className="blue-grey-text" />
                                    <label className="blue-grey-text" htmlFor="icon_telephone" >Any Notes?</label>
                                </div>
                                <Input onChange={this.updateCheck} name='isSpotTaken' type='checkbox' label='Taken?' />
                            </div>
                            <div className="row">
                                <button className="btn waves-effect waves-light co" type="submit">Add Spot!
                                <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </ReactModal>
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
        toggleMarkerDetailModal: () => {
            return dispatch(toggleMarkerDetailModal())
        },
        submitNewSpot: (details) => {
            return dispatch(submitNewSpot(details))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerDetailModal)