import { registerService, loginService, dashboardService, searchService, addSpotService } from './services'
import axios from 'axios'

export const GET_RESPONSE = "GET_RESPONSE";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const LOGOUT = "LOGOUT";
export const TOGGLE_LANDING = "TOGGLE_LANDING";
export const TOGGLE_LOGIN = "TOGGLE_LOGIN";
export const TOGGLE_REGISTER = "TOGGLE_REGISTER";
export const SET_LOCATION = "SET_LOCATION";
export const TOGGLE_MARKER = "TOGGLE_MARKER";
export const TOGGLE_MARKER_AND_SET_LOCATION = "TOGGLE_MARKER_AND_SET_LOCATION";
export const TOGGLE_DETAIL_MARKER = "TOGGLE_DETAIL_MARKER";
export const TOGGLE_SPOT_DETAIL = "OGGLE_SPOT_DETAIL"
export const NEW_MARKER = "NEW_MARKER";
export const SET_MARKERS = "SET_MARKERS";
export const TOGGLE_RESTRICTED = "TOGGLE_RESTRICTED";
export const UPDATE_SPOT = "UPDATE_SPOT";


export function register(user) {
    return (dispatch, getState) => {
        return registerService(user).then(function (res) {
            dispatch(getResponseAction(res.data.success))
        })
    }
}

export function login(user) {
    return (dispatch, getState) => {
        return loginService(user).then(function (res) {
            dispatch(setToken(res.data.auth_token))
            dispatch(dashboard())
        })
    }
}

// will use once api is set up, will pull markers from db to render to map
export function dashboard() {
    return { type: SET_MARKERS, spots}
}

// searches for location based off user input
export function searchCity(location) {
    return (dispatch, getState) => {
        return searchService(location).then((res) => {
            dispatch(loading())
            dispatch(setLocation(res))
        })
    }
}
// will post to api to add spots
export function submitNewSpot(payload) {
    return { type: NEW_MARKER, payload}
    // service looking good
    // return (dispatch, getState) => {
    //     return addSpotService(payload).then((res) => {
    // })
    // }
}

export function updateSpot(details, position) {
    let payload = {
        details, position
    }
    return { type: UPDATE_SPOT, payload }
}

export function setLocation(location) {
    return { type: SET_LOCATION, location }
}
export function logout(payload) {
    return { type: LOGOUT, payload }
}

export function loading(payload) {
    return { type: TOGGLE_LOADING, payload }
}

export function toggleLanding(payload) {
    return { type: TOGGLE_LANDING, payload }
}

export function toggleLogin(payload) {
    return { type: TOGGLE_LOGIN, payload }
}

export function toggleRegister(payload) {
    return { type: TOGGLE_REGISTER, payload }
}

export function toggleMarkerModal(payload) {
    if (payload) {
        return { type: TOGGLE_MARKER_AND_SET_LOCATION, payload }
    } else {
        return { type: TOGGLE_MARKER, payload }
    }
}

export function toggleMarkerDetailModal(payload) {
    return { type: TOGGLE_DETAIL_MARKER, payload }
}

export function toggleSpotDetailModal(marker, details) {
    let payload = { marker, details }
    return { type: TOGGLE_SPOT_DETAIL, payload }
}

export function toggleRestrictedModal(payload) {
    return { type: TOGGLE_RESTRICTED, payload}
}

function getResponseAction(payload) {
    return { type: GET_RESPONSE, payload }
}

function setToken(payload) {
    return { type: SET_TOKEN, payload }
}

function setUser(payload) {
    return { type: SET_USER, payload }
}
