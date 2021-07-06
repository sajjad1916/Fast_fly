import axios from 'axios';

export const trackid = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/auth/id', data, config);

    return response;
};

export const getid = async () => {

    const response = await axios.get('/api/auth/id');

    return response;
};