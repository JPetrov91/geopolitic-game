// src/utils/auth.js

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};
