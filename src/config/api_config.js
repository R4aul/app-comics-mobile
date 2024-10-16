import axios from 'axios'
import { getToken } from '../services/TokenServices'

const API_URL = 'https://d7a1-2806-105e-21-c47a-98a-3a37-dc92-892.ngrok-free.app';

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