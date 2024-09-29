// src/components/Main.jsx
import React, { useContext, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import api from '../api';
import CreateCharacterForm from './CreateCharacterForm';
import Modal from './Modal';
import Header from './Header';
import NavigationMenu from './NavigationMenu';
import Content from './Content';

// Стилизация основного контейнера
const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; /* Полная высота окна */
    background-image: url('/images/digital-map-background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(44, 62, 80, 0.6); /* Тёмное наложение для контраста */
        z-index: 0;
    }

    > * {
        position: relative;
        z-index: 1;
    }
`;

// Стилизация основной секции
const MainSection = styled.div`
    flex: 1;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    background: rgba(44, 62, 80, 0.8); /* Полупрозрачный тёмно-синий фон */
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    overflow-y: auto;
    margin: 0 auto; /* Центрирование секции */
`;

// Стилизация контейнера загрузки
const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #fff;
    font-size: 1.5em;
`;

const initialState = {
    character: null,
    loading: true,
    isModalOpen: false,
    activeSection: 'work',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CHARACTER':
            return { ...state, character: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'OPEN_MODAL':
            return { ...state, isModalOpen: true };
        case 'CLOSE_MODAL':
            return { ...state, isModalOpen: false };
        case 'SET_ACTIVE_SECTION':
            return { ...state, activeSection: action.payload };
        default:
            return state;
    }
};

const Main = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const response = await api.get(`/characters/user/${encodeURIComponent(user.username)}`);
                if (response.data) {
                    dispatch({ type: 'SET_CHARACTER', payload: response.data });
                } else {
                    dispatch({ type: 'SET_CHARACTER', payload: null });
                    dispatch({ type: 'OPEN_MODAL' });
                }
            } catch (error) {
                console.error('Ошибка при загрузке персонажа:', error);
                toast.error('Не удалось загрузить персонажа.');
                dispatch({ type: 'SET_CHARACTER', payload: null });
                dispatch({ type: 'OPEN_MODAL' });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        loadCharacter();
    }, [user.username]);

    const handleLogout = () => {
        logout();
        toast.info('Вы успешно вышли из системы.');
        navigate('/auth');
    };

    const handleCharacterCreated = (newCharacter) => {
        dispatch({ type: 'SET_CHARACTER', payload: newCharacter });
        dispatch({ type: 'CLOSE_MODAL' });
        toast.success('Персонаж успешно создан!');
    };

    const handleCloseModal = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };

    const handleNavigate = (section) => {
        dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
    };

    if (state.loading) {
        return (
            <MainContainer>
                <LoadingContainer>
                    <p>Загрузка...</p>
                </LoadingContainer>
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            <Header character={state.character} onLogout={handleLogout} />
            <NavigationMenu activeSection={state.activeSection} onNavigate={handleNavigate} />
            <MainSection>
                <Content
                    activeSection={state.activeSection}
                    character={state.character}
                    setCharacter={(char) => dispatch({ type: 'SET_CHARACTER', payload: char })}
                />
            </MainSection>
            <Modal isOpen={state.isModalOpen} onClose={handleCloseModal}>
                <CreateCharacterForm onCharacterCreated={handleCharacterCreated} username={user.username} />
            </Modal>
        </MainContainer>
    );
};

export default Main;
