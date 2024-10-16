import { api } from '../config/api_config'
import { setToken } from './TokenServices'

export const login = async (request) => {
    let {data} = await api.post('/auth/login', request);
    await setToken(data.accessToken)
}

export const register = async (request) => {
    let {data} = await api.post('/auth/register', request);
    await setToken(data.accessToken);
}

export const loaduser = async () => {
    let {user} = await api.get('/auth/user');
    return user
}

export const logout = async () => {
    await api.post('/auth/logout');
    await setToken(null)
}