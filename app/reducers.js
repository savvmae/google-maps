import { combineReducers } from 'redux';
import { SPOT_DETAILS, SET_TOKEN, SET_USER, GET_RESPONSE, TOGGLE_LOADING, LOGOUT, TOGGLE_LANDING, TOGGLE_LOGIN, TOGGLE_REGISTER, SET_LOCATION, TOGGLE_MARKER, TOGGLE_MARKER_AND_SET_LOCATION, TOGGLE_DETAIL_MARKER } from './actions';

import { connect } from 'react-redux'
import update from 'immutability-helper';


const initialState = {
    url: "http://maps.googleapis.com/maps/api/js?key=AIzaSyAWa0K4pJPUraabbqexa91ToelqfKN7QNQ&libraries=places‌​",
    token: null,
    user: null,
    loading: false,
    loggedIn: false,
    showLandingModal: true,
    showLoginModal: false,
    showRegisterModal: false,
    showMarkerModal: false,
    showMarkerDetailModal: false,
    markers: [{
        position: {
            lat: 32.7000,
            lng: -79.9311
        },
        message: "One."
    },
    {
        position: {
            lat: 32.8900,
            lng: -79.9511
        },
        message: "Two."
    },
    {
        position: {
            lat: 32.8000,
            lng: -79.9811
        },
        message: "Three."
    }],
    initialCenter: {
        lat: 32.79,
        lng: -79.93
    },
    initialZoom: 13,
    center: {
        lat: null,
        lng: null
    },
    spotDetails: {
        spotType: null,
        isSpotTaken: null,
        spotNotes: null,
        lat: null,
        lng: null
    }

}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SPOT_DETAILS:
            return update(state, {
                spotDetails: {
                    isSpotTaken: {
                        $set: action.payload.isSpotTaken
                    }, 
                    spotType: {
                        $set: action.payload.spotType
                    },
                    spotNotes: {
                        $set: action.payload.spotNotes
                    }
                },

            })
        case TOGGLE_LOADING:
            return update(state, {
                loading: {
                    $set: !state.loading
                }
            })
        case GET_RESPONSE:
            return update(state, {
                loading: {
                    $set: false
                }
            })
        case SET_TOKEN:
            return update(state, {
                token: {
                    $set: action.payload
                },
                loggedIn: {
                    $set: true
                }
            })
        case SET_USER:
            return update(state, {
                user: {
                    $set: action.payload
                }
            })
        case SET_LOCATION:
            return update(state, {
                center: {
                    $set: action.location
                }

            })
        case LOGOUT:
            return update(state, {
                user: {
                    $set: null
                },
                token: {
                    $set: null
                },
                loggedIn: {
                    $set: false
                }
            })
        case TOGGLE_LANDING:
            return update(state, {
                showLandingModal: {
                    $set: !state.showLandingModal
                }
            })
        case TOGGLE_LOGIN:
            return update(state, {
                showLoginModal: {
                    $set: !state.showLoginModal
                }
            })
        case TOGGLE_REGISTER:
            return update(state, {
                showRegisterModal: {
                    $set: !state.showRegisterModal
                }
            })
        case TOGGLE_MARKER:
            console.log('toggle  marker')
        
            return update(state, {
                showMarkerModal: {
                    $set: !state.showMarkerModal
                }
            })
        case TOGGLE_MARKER_AND_SET_LOCATION:
            return update(state, {
                showMarkerModal: {
                    $set: !state.showMarkerModal
                },
                spotDetails: {
                    lat: {
                        $set: action.payload.lat
                    },
                    lng: {
                        $set: action.payload.lng
                }   }
            })
        case TOGGLE_DETAIL_MARKER:
            console.log('toggle detail marker')
            return update(state, {
                showMarkerDetailModal: {
                    $set: !state.showMarkerDetailModal
                }
            })
        
        default:
            
            return state;
    }
}

