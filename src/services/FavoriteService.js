import { api } from '../config/api_config'

export const getAllComicsFavorites = async () =>{
    let response = await api.get('/favorites/getAllComicsFavorites');
    return response;
}

export const storeOrChoiseComicFavorite = async (data) => {
    let response = await api.post('/favorites/storeOrChoiseComicFavorite',data);
    return response;
}