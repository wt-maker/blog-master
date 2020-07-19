import { Modal } from 'antd'
import loginStatus from './login'
const axios = require('axios')

const myAxios = axios.create({
    baseURL: '/api'
})

// 请求拦截
myAxios.interceptors.request.use(
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
// 相应拦截
myAxios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (!loginStatus() && error.response.status === 401) {
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

export default myAxios