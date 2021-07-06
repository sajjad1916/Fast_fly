import axios from 'axios';

export const deliveryman = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/auth/delivery', data, config);

    return response;
};

export const deliverylogin = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/auth/deliverylogin', data, config);

    return response;
};