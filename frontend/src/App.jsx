// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './AuthPage';
import Main from './components/Main';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./components/ErrorBoundary";

const theme = {
    colors: {
        primary: '#3498db',
        primaryHover: '#2980b9',
        active: '#27ae60',
        danger: '#e74c3c',
        dangerHover: '#c0392b',
        muted: '#7f8c8d',
        title: '#f1c40f',
        text: '#ecf0f1',
        background: 'rgba(255, 255, 255, 0.1)',
        regionBackground: 'rgba(44, 62, 80, 0.9)',
    },
    // Добавьте другие параметры темы (шрифты, размеры и т.д.)
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <ErrorBoundary>
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route
                        path="/main"
                        element={
                            <PrivateRoute>
                                <ThemeProvider theme={theme}>
                                <Main />
                                </ThemeProvider>
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/auth" replace />} />
                </Routes>
                </ErrorBoundary>
            </Router>
            <ToastContainer />
        </AuthProvider>
    );
};

// Компонент для защиты приватных маршрутов
const PrivateRoute = ({ children }) => {
    const { authToken } = React.useContext(AuthContext);
    return authToken ? children : <Navigate to="/auth" />;
};

export default App;
