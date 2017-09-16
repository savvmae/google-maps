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
            console.log(res)
            let loc = res.data.results[0].geometry.location;
            return loc
        })
}
// working, ready to get plugged into api
export function addSpotService(details) {
    return axios({
        method: 'post',
        url: '/api/spots',
        data: {
            details
        }
    }).then(serverResponse => {
        console.log(serverResponse)
        return serverResponse
    })
}