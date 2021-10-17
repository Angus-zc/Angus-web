import { AxiosResponse } from 'axios'
import { Widget } from '../config/componentTypes'
import request from './request'
import { storage } from '../utils'

type Key = Exclude<keyof any, symbol>

interface Response<T = any> {
    status: number,
    data: T,
    message: string
}

/*获取本地信息*/
export const userId = storage.get('userId')

/*登录接口*/
export const login = (userName: Key, password: Key) => {
    return request.get('/user/login', {
        userName,
        password
    }) as Promise<AxiosResponse<Response>>
}

/*注册接口*/
export const register = async (userName: Key, password: Key) => {
    return request.get('/user/register', {
        userName,
        password
    }) as Promise<AxiosResponse<Response>>
}

export const addPage = (
    pageInfo: {
        pageUrl: string,
        pageName: string,
        description: string,
        componentData: Widget[]
    }
) => {
    const token = storage.get('token')
    return request.get('/data/addpage', {
        pageInfo,
        token
    }) as Promise<AxiosResponse<Response>>
}

export const getPages = () => {
    const token = storage.get('token')
    return request.get('/data/getpages',
        { token }
    ) as Promise<AxiosResponse<Response>>
}

export const delPage = (pageId: string) => {
    const token = storage.get('token')
    return request.get('/data/delpage',
        { token, pageId }
    ) as Promise<AxiosResponse<Response>>
}

export const saveData = (componentData: Widget[], pageId: string) => {
    const token = storage.get('token')
    return request.post('/data/save',
        { token, componentData, pageId }
    ) as Promise<AxiosResponse<Response>>
}

export const getComponentData = () => {
    const token = storage.get('token')
    const pageId = storage.get('pageId')
    return request.get('/data/getdata',
        { token, pageId }
    ) as Promise<AxiosResponse<Response>>
}

export const publishProject = () => {
    const token = storage.get('token')
    return request.post('/data/publish',
        { token }
    ) as Promise<AxiosResponse<Response>>
}

export const generateJSON = (id: string) => {
    // const pageId = storage.get('pageId') as string
    const token = storage.get('token')
    return request.post('data/generate_json',
        { token, pageId: id }
    ) as Promise<AxiosResponse<Response>>
}

export const deleteJSON = (fileID: string)=>{
    const token = storage.get('token')
    return request.post('data/delete_json',
        { token, fileID }
    ) as Promise<AxiosResponse<Response>>
}