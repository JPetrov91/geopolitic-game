// src/utils/marketApi.js
import axios from 'axios';
import { getAuthToken } from './utils/auth';

const marketApi = axios.create({
    baseURL: 'http://localhost:8080/api'
});

marketApi.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default marketApi;
