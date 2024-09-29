// src/AuthPage.js

import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import api from "./api";

// Анимация для кнопок
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Стили для контейнера
const AuthContainer = styled.div`
    width: 400px;
    margin: 50px auto;
    padding: 30px;
    border: 2px solid #2c3e50;
    border-radius: 12px;
    background-color: #1a1a1a;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    color: #ecf0f1;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

// Стили для эмблемы
const Emblem = styled.div`
    text-align: center;
    margin-bottom: 20px;

    img {
        width: 200px;
        height: auto;
        filter: drop-shadow(0 0 10px #16a085);
    }
`;

// Стили для формы
const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
`;

// Стили для заголовка
const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #16a085;
`;

// Стили для группы полей формы
const FormGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

// Стили для меток
const Label = styled.label`
    margin-bottom: 5px;
    font-size: 14px;
    color: #bdc3c7;
`;

// Стили для полей ввода
const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #34495e;
    border-radius: 6px;
    background-color: #2c3e50;
    color: #ecf0f1;

    &:focus {
        outline: none;
        border-color: #16a085;
        box-shadow: 0 0 5px rgba(22, 160, 133, 0.5);
    }
`;

// Стили для кнопок
const Button = styled.button`
    padding: 12px;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    background-color: #16a085;
    color: #ecf0f1;
    transition: background-color 0.3s ease;
    animation: ${bounce} 2s infinite;

    &:hover {
        background-color: #1abc9c;
    }

    &.secondary {
        background-color: #e74c3c;

        &:hover {
            background-color: #c0392b;
        }
    }
`;

// Стили для сообщений об ошибках
const ErrorMessage = styled.div`
    color: #e74c3c;
    text-align: center;
    margin-bottom: 10px;
`;

const AuthPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const payload = {
                username: loginUsername,
                password: loginPassword
            };
            const response = await api.post('/auth/login', payload);

            if (response.status === 200) {
                const data = response.data; // Предполагается, что бекэнд возвращает токен и информацию о пользователе
                login(data.token, data.user); // Сохраняем токен и информацию о пользователе
                toast.success('Вход успешен! Добро пожаловать.');
                navigate('/main');
            } else {
                setErrorMessage(response.data.message || 'Неверный пользователь или пароль');
                toast.error(response.data.message || 'Неверный пользователь или пароль');
            }
        } catch (error) {
            console.error('Ошибка при входе:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте позже.');
                toast.error('Произошла ошибка. Пожалуйста, попробуйте позже.');
            }
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const payload = {
                username: registerUsername,
                password: registerPassword,
                email: registerEmail
            };

            const response = await api.post('/auth/register', payload);

            if (response.status === 201 || response.status === 200) {
                // Успешная регистрация
                toast.success('Регистрация успешна! Вы будете перенаправлены на страницу входа.');
                setIsRegistering(false);
                // Очистить поля регистрации
                setRegisterUsername('');
                setRegisterPassword('');
                setRegisterEmail('');
                navigate('/auth'); // Редирект на страницу входа
            } else {
                // Ошибка регистрации
                setErrorMessage(response.data.message || 'Не удалось зарегистрировать пользователя');
                toast.error(response.data.message || 'Не удалось зарегистрировать пользователя');
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте позже.');
                toast.error('Произошла ошибка. Пожалуйста, попробуйте позже.');
            }
        }
    };

    const toggleRegistering = () => {
        setIsRegistering(!isRegistering);
        setErrorMessage('');
    };

    return (
        <AuthContainer>
            <Emblem>
                <img src="/public//images/emblem.png" alt="Emblem" />
            </Emblem>

            {!isRegistering ? (
                <AuthForm onSubmit={handleLoginSubmit}>
                    <FormTitle>Войти</FormTitle>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <FormGroup>
                        <Label htmlFor="loginUsername">Имя пользователя:</Label>
                        <Input
                            type="text"
                            id="loginUsername"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            required
                            placeholder="Введите ваше имя пользователя"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="loginPassword">Пароль:</Label>
                        <Input
                            type="password"
                            id="loginPassword"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            placeholder="Введите ваш пароль"
                        />
                    </FormGroup>
                    <Button type="submit">Войти</Button>
                    <Button type="button" className="secondary" onClick={toggleRegistering}>
                        Регистрация
                    </Button>
                </AuthForm>
            ) : (
                <AuthForm onSubmit={handleRegisterSubmit}>
                    <FormTitle>Регистрация</FormTitle>
                    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                    <FormGroup>
                        <Label htmlFor="registerUsername">Имя пользователя:</Label>
                        <Input
                            type="text"
                            id="registerUsername"
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                            required
                            placeholder="Придумайте имя пользователя"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="registerPassword">Пароль:</Label>
                        <Input
                            type="password"
                            id="registerPassword"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            required
                            placeholder="Придумайте пароль"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="registerEmail">Email:</Label>
                        <Input
                            type="email"
                            id="registerEmail"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                            placeholder="Введите ваш email"
                        />
                    </FormGroup>
                    <Button type="submit">Зарегистрироваться</Button>
                    <Button type="button" className="secondary" onClick={toggleRegistering}>
                        Назад
                    </Button>
                </AuthForm>
            )}
        </AuthContainer>
    );
};

export default AuthPage;
