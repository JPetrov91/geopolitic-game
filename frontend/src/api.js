// src/utils/api.js

import axios from 'axios';
import { getAuthToken } from './utils/auth'; // Функция для получения токена из AuthContext или локального хранилища

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_BASE_URL, // Используем относительный путь, проксируемый Nginx
});

// Добавление заголовка Authorization к каждому запросу, если токен доступен
api.interceptors.request.use(
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

export default api;
