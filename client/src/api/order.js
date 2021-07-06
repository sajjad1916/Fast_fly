import axios from 'axios';

export const order = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/order/place', data, config);

    return response;
};

export const getOrder = async() => {
    const response = await axios.get('/api/auth/order');
    return response;
}

export const getallOrder = async() => {
    const response = await axios.get('/api/auth/orders');

    return response;
}

export const options = async(data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/order/option', data, config);

    return response;
}
export const delivery = async(data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await axios.post('/api/order/delivery/assign', data, config);

    return response;
}