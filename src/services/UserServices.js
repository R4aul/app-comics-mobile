import { api } from '../config/api_config'

export const choisePreferences = async (preferences) => {
    let response = await api.post('/users/choisePreferences', preferences);
    return response;
}

export const updatePreferences = async (preferences) => {
    let response = await api.post('/users/updatePreferences', preferences);
    return response;
}