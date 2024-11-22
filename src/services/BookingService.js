import { api } from '../config/api_config'

export const index = async () => {
    let response = await api.get('bookings/index');
    return response;
}

export const store = async (data) => {
    let response = await api.post('bookings/store',data);
    return response;
}