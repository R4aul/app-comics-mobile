import { api } from '../config/api_config'

export const createReview = async (data) => {
    let response = await api.post('/reviews/createReview', data);
    return response;
}

