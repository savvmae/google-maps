import { combineReducers } from 'redux';
import { SET_TOKEN, SET_USER, GET_RESPONSE, TOGGLE_LOADING, LOGOUT, TOGGLE_LANDING, TOGGLE_LOGIN, TOGGLE_REGISTER } from './actions';

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
    showRegisterModal: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            console.log("i am in the loading reducer")
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

