import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5025/api', 
});

export const getProducts = (filters = {}) => {
    return api.get('/products', { params: filters });
};

export const createOrder = (orderData) => {
    return api.post('/orders', orderData);
};

export const initiatePayment = (orderId) => {
    return api.post('/payment', { orderId });
};

export default api;