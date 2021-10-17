import axios, { AxiosResponse } from 'axios'

// export const BASE_URL = 'http://120.79.205.215:3000/'
export const BASE_URL = 'http://localhost:3000/'
export const ONLINE = "https://online-web-4gblby8s82527d6d-1306774321.tcloudbaseapp.com/#/"
export const SERVER_LESS = "https://angus-server-6g36j4y8db4fbe91-1306774321.ap-shanghai.app.tcloudbase.com"

type MapRequest<T extends keyof any> = {
    [K in T]: (
        url: string,    
        params: Record<keyof any, any>
    ) => Promise<AxiosResponse<any>>
}

axios.defaults.baseURL = SERVER_LESS

/*封装请求方法*/
const request: MapRequest<'get' | 'post' | 'del'> = {
    get(url, params) {
        return axios.get(url, { params })
    },
    post(url, data) {
        return axios.post(url, data)
    },
    del(url, data) {
        return axios.delete(url, data)
    }
}

export default request