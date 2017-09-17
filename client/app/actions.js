import { registerService, loginService, dashboardService, searchService, addSpotService, updateSpotService, deleteSpotService } from './services'
import axios from 'axios'

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
export const RESET_CURRENT_SPOT = "RESET_CURRENT_SPOT";
export const SERVICE_ERROR = "SERVICE_ERROR"


export function register(user) {
    return (dispatch, getState) => {
        return registerService(user)
            .then(function (res) {
                if (!res.data) {
                    dispatch(setError(res))
                } else {
                    dispatch(setToken(res.data.token))
                    dispatch(toggleRegister())
                    dispatch(toggleLanding())
                    dispatch(setUser(user.username))
                }
            })
    }
}

export function setError(error) {
    return { type: SERVICE_ERROR, error }
}

export function login(user) {
    return (dispatch, getState) => {
        return loginService(user).then(function (res) {
            if (!res.data) {
                dispatch(setError(res))
            } else {
                dispatch(setToken(res.data.token))
                dispatch(toggleLogin())
                dispatch(toggleLanding())
                dispatch(setUser(res.data.name))
            }
        })
    }
}

export function dashboard() {
    return (dispatch, getState) => {
        return dashboardService().then((res) => {
            console.log('action', res.data)
            dispatch(setMarkers(res.data))
        })
    }
}

function setMarkers(spots) {
    return { type: SET_MARKERS, spots }
}

export function searchCity(location) {
    return (dispatch, getState) => {
        return searchService(location).then((res) => {
            dispatch(loading())
            dispatch(setLocation(res))
        })
    }
}

export function submitNewSpot(payload, token) {
    return (dispatch, getState) => {
        return addSpotService(payload, token).then((res) => {
            dispatch(toggleMarkerDetailModal())
            dispatch(toggleMarkerModal())
            return res
        })
    }
}

export function updateSpot(updated, details, token) {
    return (dispatch, getState) => {
        return updateSpotService(updated, details._id, token).then((res) => {
            dispatch(toggleSpotDetailModal())
            return res
        })
    }
}

export function deleteSpot(id, token) {
    return (dispatch, getState) => {
        return deleteSpotService(id, token).then((res) => {
            return { type: RESET_CURRENT_SPOT }
        })
    }
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
    return { type: TOGGLE_RESTRICTED, payload }
}


function setToken(payload) {
    return { type: SET_TOKEN, payload }
}

function setUser(payload) {
    return { type: SET_USER, payload }
}
