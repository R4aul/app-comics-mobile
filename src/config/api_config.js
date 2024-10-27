import axios from 'axios'
import { getToken } from '../services/TokenServices'

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
    baseURL:API_URL+'/api',
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
});

api.interceptors.request.use(async(req)=>{
    const TOKEN = await getToken();
    if (TOKEN !== null) {
       req.headers["Authorization"] = `Bearer ${TOKEN}`
    }
    return req;
})