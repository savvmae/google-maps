import { combineReducers } from 'redux';
import { SET_TOKEN, SET_USER, GET_RESPONSE, TOGGLE_LOADING, LOGOUT, TOGGLE_LANDING, TOGGLE_LOGIN, TOGGLE_REGISTER, SET_LOCATION } from './actions';

import { connect } from 'react-redux'
import update from 'immutability-helper';


const initialState = {
    token: null,
    user: null,
    message: '',
    loading: false,
    loggedIn: false,
    showLandingModal: true,
    showLoginModal: false,
    showRegisterModal: false,
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
        lat: 32.8000,
        lng: -79.9311
    },
    initialZoom: 12,
    center: {
        lat: null,
        lng: null
    }

}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}

