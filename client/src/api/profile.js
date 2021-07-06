import axios from 'axios';

export const profile = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/profile/post', data, config);

    return response;
};

export const getProfile =() => {
    const response =  axios.get('/api/auth/profile');

    return response;
}





