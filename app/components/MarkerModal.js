import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon } from 'react-materialize'

import { toggleLanding, toggleLogin, toggleMarkerModal, toggleMarkerDetailModal } from '../actions';

import MarkerDetailModal from './MarkerDetailModal';


class MarkerModal extends Component {
    constructor(props) {
        super(props)
    }

    handleToggleDetailModal = () => {
        this.props.toggleMarkerDetailModal()
        // create function to delete the marker
        // or don't trigger marker there?
        // but location for new spot depends on that location being sent. doesn't have to mean marker gets rendered. 
    }
    handleToggleMarkerModal = () => {
        this.props.toggleMarkerModal()
        this.props.removeMarker()
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
                transform: 'translate(-30%, -5%)',
                border: '2px solid black'
            }
        };
        return (
            <div>
                <ReactModal header='New Spot' style={customStyles}
                    isOpen={this.props.state.showMarkerModal}
                    contentLabel="Minimal Modal Example">
                    <p>  Would you like to add this location as a parking spot? </p>
                    <div className="row">
                        <button className="btn waves-effect waves-light z-zero margy-r co" onClick={this.handleToggleDetailModal}>Yes</button>
                    
                        <button className="btn waves-effect waves-light z-zero co" onClick={this.handleToggleMarkerModal} >No</button></div>
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
        toggleMarkerModal: () => {
            return dispatch(toggleMarkerModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerModal)