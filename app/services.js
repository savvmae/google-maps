import axios from 'axios'


export function registerService(param) {
        console.log( "i am the register service")
    
    return axios({
        method: 'post',
        url: 'https://user-auth-test.herokuapp.com/register',
        data: {
            email: param.email,
            password: param.password,
            full_name: param.name,
            message: param.secret
        }
    }).then(serverResponse => {
        console.log(serverResponse)
        return serverResponse
    })
}

export function loginService(param) {
    console.log('I am in the service')
    return axios({
        method: 'post',
        url: 'https://user-auth-test.herokuapp.com/login',
        data: {
            email: param.email,
            password: param.password
        }
    }).then(serverResponse => {
        console.log(serverResponse, "i am the service response")
        return serverResponse
    })
}

export function dashboardService(param) {
    console.log("i am triggering")
    return axios({
        method: 'get',
        url: 'https://user-auth-test.herokuapp.com/dashboard',
        headers: {
            'X-AUTH-TOKEN': param
        }
    }).then(serverResponse => {
        console.log(serverResponse)
        return serverResponse
    })
}