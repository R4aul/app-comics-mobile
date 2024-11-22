import { api } from '../config/api_config'

export const notification = () =>{
    let response = api.get('/notifications/getNotifications');
    return response;
}