import { api } from '../config/api_config'

export const getComics = async (comic = null) => {
    if (comic != null) {
       let comics = await api.get('/comics/getAllComics/'+comic)
       return comics; 
    }
    let comics = await api.get('/comics/getAllComics');
    return comics;
}

export const getComic = async (id) => {
    let comic = await api.get('/comics/getComicById/'+id);
    return comic;
}

export const bookingComic = async (data) => {
    let response = await api.post('/comics/bookingComic/',data);
    return response;
}

export const getAllCategories = async () => {
    let categories = await api.get('/comics/getAllComics');
    return categories;
}