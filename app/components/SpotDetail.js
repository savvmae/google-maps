import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Row, Input, Link, Card, Col, Button, Icon } from 'react-materialize'
import { toggleSpotDetailModal, toggleRestrictedModal, updateSpot } from '../actions'

class SpotDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            spotType: this.props.state.currentSpot.details.details.spotType,
            spotNotes: this.props.state.currentSpot.details.details.spotNotes,
            isSpotTaken: this.props.state.currentSpot.details.details.isSpotTaken
        }
    }

    clearText = (event) => {
        this.setState({ [event.target.name]: ''})
    }

    putText = (event) => {
        if (event.target.value === '') {
            if (event.target.name === 'spotType') {
                this.setState({ spotType: this.props.state.currentSpot.details.details.spotType })
            }
            else {
                this.setState({ spotNotes: this.props.state.currentSpot.details.details.spotNotes })
            }
        }
    }

    updateState = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    updateCheck = (event) => {
        this.setState({ isSpotTaken: event.target.checked })
    }

    handleRemoveMarker = () => {
        if (this.props.state.loggedIn) {
            this.props.removeMarker()
            this.props.toggleSpotDetailModal()
        } else {
            this.props.toggleRestrictedModal()
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.state.loggedIn) {
            this.props.addMarkerClick(this.props.state.currentSpot.marker, this.state)
            this.props.updateSpot(this.state, this.props.state.currentSpot.position)
            
        } else {
            this.props.toggleRestrictedModal()
        }
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
                border: '2px solid black'
            }
        };

        return (

            <div>
                <ReactModal style={customStyles} header='SPOT DETAILS'
                    isOpen={this.props.state.showSpotDetailModal} contentLabel="spot">
                    <Button floating icon='close' onClick={this.props.toggleSpotDetailModal} className='co-b' large style={{ bottom: '0px', left: '45%' }} />

                    <p className="thick big">  Details about the spot! </p>
                    <div className="row">
                        <form onSubmit={this.handleSubmit} className="col s12">
                            <div className="row">

                                <div className="input-field col s6 spot-f">
                                    <input onChange={this.updateState} onFocus={this.clearText} onBlur={this.putText} type="text" name="spotType" className="validate teal-text text-darken-3 spot-f" value={this.state.spotType} />

                                </div>
                                <div className="input-field col s6 spot-f">
                                    <input onChange={this.updateState} onFocus={this.clearText} onBlur={this.putText} type="text" name="spotNotes" value={this.state.spotNotes} className="validate teal-text text-darken-3 spot-f" />

                                </div>
                                <Input className="co" onChange={this.updateCheck} checked={this.state.isSpotTaken} name='isSpotTaken' type='checkbox' label='Taken?' />
                            </div>
                            <div className="row">
                                <button className="btn waves-effect waves-light co margy-r" type="submit">Update Spot!
                            <i className="material-icons right">send</i>
                                </button>
                                <button className="btn waves-effect waves-light co" onClick={this.handleRemoveMarker} >Delete Spot!
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
        },
        toggleRestrictedModal: () => {
            return dispatch(toggleRestrictedModal())
        },
        updateSpot: (details, position) => {
            return dispatch(updateSpot(details, position))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail)

