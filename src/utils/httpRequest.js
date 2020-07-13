import { Modal } from 'antd'
import loginStatus from './login'
const axios = require('axios')


export const httpRequest = axios.create({
    baseURL: '/api'
})

httpRequest.interceptors.request.use(
    config => {
        let tokenStorage = window.localStorage.getItem('token')
        if (tokenStorage) {
            let token = JSON.parse(tokenStorage).token
            config.headers.authorization = 'Bearer ' + token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

httpRequest.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (!loginStatus() && error.response.status == 401) {
            Modal.confirm({
                title: '提示!',
                content: '用户信息已过期，请点击确定后重新登录。',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    window.localStorage.removeItem('token')
                    window.location.href = '/'
                },
                onCancel() {
                }
            })
        }
        return Promise.reject(error)
    }
)
