import React, { createContext, useState, useEffect } from 'react';

// Создание контекста
export const AuthContext = createContext();

// Провайдер контекста
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Хранение информации о пользователе

    useEffect(() => {
        // Синхронизация состояния с localStorage при изменении authToken или user
        if (authToken) {
            localStorage.setItem('authToken', authToken);
        } else {
            localStorage.removeItem('authToken');
        }

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [authToken, user]);

    const login = (token, userData) => {
        setAuthToken(token);
        setUser(userData);
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
