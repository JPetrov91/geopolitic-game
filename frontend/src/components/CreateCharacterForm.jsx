// src/components/CreateCharacterForm.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import api from '../api';

// Стилизация основного контейнера формы с использованием motion.div
const FormContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('/images/paper-texture.png'); /* Бумажная текстура */
    background-size: cover;
    background-position: center;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    color: #ecf0f1;

    @media (max-width: 500px) {
        padding: 20px;
    }
`;

// Стилизация заголовка формы
const FormTitle = styled.h3`
    margin-bottom: 15px;
    color: #2c3e50;
    font-size: 1.6em;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

// Стилизация группы формы
const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;
`;

// Стилизация метки (label)
const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    color: #34495e;
`;

// Стилизация поля ввода
const Input = styled.input`
    padding: 10px;
    border: 2px solid #bdc3c7;
    border-radius: 5px;
    font-size: 1em;
    transition: border-color 0.3s ease;
    background-color: rgba(255, 255, 255, 0.2);
    color: #ecf0f1;

    &::placeholder {
        color: #bdc3c7;
    }

    &:focus {
        border-color: #3498db;
        outline: none;
    }
`;

// Стилизация сообщения об ошибке
const ErrorMessage = styled.p`
    color: #e74c3c;
    margin-bottom: 10px;
    font-weight: bold;
    text-align: center;
`;

// Стилизация кнопки отправки
const SubmitButton = styled.button`
    padding: 12px 25px;
    background-color: #2ecc71; /* Зелёная кнопка */
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #27ae60;
        transform: translateY(-2px);
    }

    &:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
        transform: none;
    }
`;

const CreateCharacterForm = ({ onCharacterCreated, username }) => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateCharacter = async (e) => {
        e.preventDefault();
        setError('');

        if (nickname.trim().length < 3) {
            setError('Никнейм должен содержать не менее 3 символов.');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                nickname: nickname.trim(),
            };

            const response = await api.post(`/characters/user/${encodeURIComponent(username)}`, payload);

            if (response.status === 201 || response.status === 200) {
                onCharacterCreated(response.data);
            } else {
                // Предполагается, что API возвращает JSON с полем message
                const errorData = response.data;
                setError(errorData.message || 'Не удалось создать персонажа.');
            }
        } catch (err) {
            console.error('Ошибка при создании персонажа:', err);
            // Проверяем, содержит ли ошибка ответ от сервера
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Произошла ошибка при создании персонажа.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <FormTitle>Создать Персонажа</FormTitle>
            <form onSubmit={handleCreateCharacter} style={{ width: '100%' }}>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <FormGroup>
                    <Label htmlFor="nickname">Никнейм:</Label>
                    <Input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required
                        maxLength={50}
                        placeholder="Введите никнейм"
                    />
                </FormGroup>
                {/* Добавьте другие поля, если необходимо */}
                <SubmitButton type="submit" disabled={loading}>
                    {loading ? 'Создание...' : 'Создать'}
                </SubmitButton>
            </form>
        </FormContainer>
    );
};

CreateCharacterForm.propTypes = {
    onCharacterCreated: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
};

export default CreateCharacterForm;
