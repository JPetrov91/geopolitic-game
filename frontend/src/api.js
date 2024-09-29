// src/utils/api.js

import axios from 'axios';
import { getAuthToken } from './utils/auth'; // Функция для получения токена из AuthContext или локального хранилища

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Используем относительный путь, проксируемый Nginx
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
