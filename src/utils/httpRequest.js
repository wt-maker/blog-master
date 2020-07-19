import myAxios from './myAxios'
import { message } from 'antd'

// 封装http请求
export const httpRequest = (url, data = {}, methods = 'GET') => {

    return new Promise(async (resolve) => {
        let response
        try {
            if (methods === 'GET') {
                response = await myAxios.get(url, { params: data })
            }
            if (methods === 'POST') {
                response = await myAxios.post(url, data)
            }
            resolve(response.data)
        } catch (error) {
            message.error('服务器异常，请稍后再试')
        }
    })
}



