import { message, Modal } from 'antd'
import loginStatus from './login'
const axios = require('axios')

const confirm = Modal.confirm;

export const httpRequest = axios.create({
    baseURL: '/api'
})

httpRequest.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('token')
        if (token) {
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
        if (!loginStatus()) {
            confirm({
                title: '提示!',
                content: '用户信息已过期，请点击确定后重新登录。',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    window.location.href = '/login'
                },
                onCancel() {
                    console.log('Cancel')
                }
            })
        }
        return Promise.reject(error)
    }
)
