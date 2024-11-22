import { ALWAYS_THIS_DEVICE_ONLY } from 'expo-secure-store';
import { api } from '../config/api_config'

export const choisePreferences = async (preferences) => {
    let response = await api.post('/users/choisePreferens', preferences);
    return response;
}

export const updatePreferences = async (preferences) => {
    let response = await api.post('/users/updatePreferences', preferences);
    return response;
}

export const checkIfFavoriteStatus = async (id) =>{
    let response = await api.get(`users/${id}/checkFavoriteStatus`);
    return response;
}

export const getAllFavorites = async () => {
    let response = await api.get('users/getAllFavorites');
    return response;
}

export const checkBookingStatus = async (id) => {
    let response = await api.get(`users/${id}/checkBookingStatus`);
    return response;
}

export const checkComicFavoriteStatus = async (id) => {
    let response = await api.get(`users/${id}/checkComicFavoriteStatus`);
    return response;
}