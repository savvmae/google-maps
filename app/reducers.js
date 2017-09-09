import { combineReducers } from 'redux';
import { NEW_MARKER, SET_TOKEN, SET_USER, GET_RESPONSE, TOGGLE_LOADING, LOGOUT, TOGGLE_LANDING, TOGGLE_LOGIN, TOGGLE_REGISTER, SET_LOCATION, TOGGLE_MARKER, TOGGLE_MARKER_AND_SET_LOCATION, TOGGLE_DETAIL_MARKER, TOGGLE_SPOT_DETAIL, TOGGLE_RESTRICTED } from './actions';

import { connect } from 'react-redux'
import update from 'immutability-helper';


const initialState = {
    url: "http://maps.googleapis.com/maps/api/js?key=AIzaSyDsLRWK_AfZtF4dsnajc8zNpRU-Sp9KxuI&libraries=places",
    token: null,
    user: null,
    landing: true,
    loading: false,
    loggedIn: true,
    showLandingModal: true,
    showLoginModal: false,
    showRegisterModal: false,
    showMarkerModal: false,
    showMarkerDetailModal: false,
    showSpotDetailModal: false,
    currentSpot: null,
    markers: [{
        position: {
            lat: 32.797,
            lng: -79.955
        },
        details: {
            spotType: "lot",
            spotNotes: "34 spots",
            isSpotTaken: true
        }
    },
    {
        position: {
            lat: 32.792,
            lng: -79.95
        },
        details: {
            spotType: "broken meter",
            spotNotes: "sometimes working",
            isSpotTaken: false
        }
    },
    {
        position: {
            lat: 32.795,
            lng: -79.935
        },
        details: {
            spotType: "resdential no time limit",
            spotNotes: "1 block",
            isSpotTaken: true
        }
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
        lat: null,
        lng: null
    }

}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        // pushes new spot into markers, resets spot details and closes marker modals
        case NEW_MARKER:
            let newMarker = [{
                position: {
                    lat: action.payload.lat,
                    lng: action.payload.lng
                },
                details: {
                    isSpotTaken: action.payload.isSpotTaken,
                    spotType: action.payload.spotType,
                    spotNotes: action.payload.spotNotes
                }
            }]
            return update(state, {
                markers: {
                    $push: newMarker
                },
                spotDetails: {
                    lat: {
                        $set: null
                    },
                    lng: {
                        $set: null
                    }
                },
                showMarkerModal: {
                    $set: false
                },
                showMarkerDetailModal: {
                    $set: false
                }
            })
        //toggles loading bar
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
        //toggle landing modal
        case TOGGLE_LANDING:
            return update(state, {
                showLandingModal: {
                    $set: !state.showLandingModal
                }
            })
        //toggle login modal
        case TOGGLE_LOGIN:
            return update(state, {
                showLoginModal: {
                    $set: !state.showLoginModal
                }
            })
        // toggle register modal
        case TOGGLE_REGISTER:
            return update(state, {
                showRegisterModal: {
                    $set: !state.showRegisterModal
                }
            })
        // toggle add marker prompt modal
        case TOGGLE_MARKER:
            return update(state, {
                showMarkerModal: {
                    $set: !state.showMarkerModal
                }
            })
        case TOGGLE_RESTRICTED: 
            return update(state, {
                landing: {
                    $set: false
                },
                showLandingModal: {
                    $set: true
                }

            })
        // toggle add marker prompt modal and set location of new marker
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
                    }
                }
            })
        // toggle add spot details modal
        case TOGGLE_DETAIL_MARKER:
            return update(state, {
                showMarkerDetailModal: {
                    $set: !state.showMarkerDetailModal
                }
            })
        case TOGGLE_SPOT_DETAIL:
            return update(state, {
                showSpotDetailModal: {
                    $set: !state.showSpotDetailModal
                },
                currentSpot: {
                    $set: action.payload
                }
            })
        default:
            return state;
    }
}

