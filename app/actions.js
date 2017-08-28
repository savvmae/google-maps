import { registerService, loginService, dashboardService } from './services'

export const GET_RESPONSE = "GET_RESPONSE";
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const LOGOUT = "LOGOUT";
export const TOGGLE_LANDING = "TOGGLE_LANDING"
export const TOGGLE_LOGIN = "TOGGLE_LOGIN"
export const TOGGLE_REGISTER = "TOGGLE_REGISTER"



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

export function dashboard(token) {
    return (dispatch, getState) => {
        token = token || getState().token;
        if (!token) {
            return;
        }
        return dashboardService(token).then(function (res) {
            dispatch(setUser(res.data))
        })
    }
}

export function logout(payload) {
    return {type: LOGOUT, payload}
}

export function loading(payload) {
    return {type: TOGGLE_LOADING, payload}
}

export function toggleLanding(payload) {
    return {type: TOGGLE_LANDING, payload}
} 

export function toggleLogin(payload) {
    return {type: TOGGLE_LOGIN, payload}
} 

export function toggleRegister(payload) {
    return {type: TOGGLE_REGISTER, payload}
} 

function getResponseAction (payload) {
  return { type: GET_RESPONSE, payload }
}

function setToken (payload) {
    return { type: SET_TOKEN, payload }
}

function setUser (payload) {
    return { type: SET_USER, payload }
}
