import axios from 'axios'


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
    })
}

export function dashboardService() {
    return axios.get('/api/spots')
        .then(res => {
            return res
        })
}

export function searchService(param) {
    return axios.get('https://proxy.calweb.xyz/https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + param + '&key=AIzaSyDeWY-pmtMyV_d2yc5YJTZFqRPd6pMV268')
        .then(res => {
            let loc = res.data.results[0].geometry.location;
            return loc
        })
}
// working, ready to get plugged into api
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