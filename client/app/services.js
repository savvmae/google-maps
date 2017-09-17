import axios from 'axios'
import { key } from './secrets'


export function registerService(param) {
    return axios({
        method: 'post',
        url: '/api/signup',
        data: {
            email: param.email,
            password: param.password,
            userName: param.username,
        }
    }).then(serverResponse => {
        return serverResponse
    }).catch((err) => {
        return err.response.data.message 
    })
}

export function loginService(param) {
    return axios({
        method: 'post',
        url: '/api/login',
        data: {
            email: param.email,
            password: param.password
        }
    }).then(serverResponse => {
        return serverResponse
    }).catch((err) => {
        console.log(err.response.data.message);
        return err.response.data.message 
    })
}

export function dashboardService() {
    return axios.get('/api/spots')
        .then(res => {
            console.log('service', res)
            return res
        })
}

export function searchService(param) {
    return axios.get("https://proxy.calweb.xyz/https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + param + "&key=" + key )
        .then(res => {
            let loc = res.data.results[0].geometry.location;
            return loc
        })
}

export function addSpotService(details, token) {
    const AuthStr = "JWT ".concat(token);
    return axios({
        method: 'post',
        url: '/api/spots',
        headers: { Authorization: AuthStr },
        data: {
            details: details
        }
    }).then(serverResponse => {
        return serverResponse
    })
}

export function updateSpotService(updated, id, token) {
    const AuthStr = "JWT ".concat(token);    
    return axios({
        method: 'put',
        url: '/api/spots',
        headers: { Authorization: AuthStr },
        data: {
            id: id,
            details: updated
        }
    }).then(serverResponse => {
        return serverResponse
    })
}

export function deleteSpotService(id, token) {
    const AuthStr = "JWT ".concat(token);    
    return axios({
        method: 'delete',
        url: '/api/spots',
        headers: { Authorization: AuthStr },
        data: {
            id: id
        }
    }).then(serverResponse => {
        return serverResponse
    }) 
}