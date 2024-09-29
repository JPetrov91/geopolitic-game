// src/components/MyFaction.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from './Modal'; // Используем уже существующий компонент Modal
import FactionModalContent from './FactionModalContent'; // Новый компонент
import api from '../api'; // Импортируем API Utility
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// Стилизация контейнера фракции
const MyFactionContainer = styled.div`
    cursor: pointer;
    margin-left: auto; /* Размещает компонент справа */
    display: flex;
    align-items: center;
    z-index: 1001; /* Убедитесь, что контейнер выше по z-index, если нужно */
`;

// Стилизация аватара фракции
const FactionAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
    transition: transform 0.2s;
    
    &:hover {
        transform: scale(1.1);
    }
`;

// Стилизация заголовка для отсутствия фракции
const NoFactionText = styled.span`
    margin-left: 10px;
    color: #fff;
    font-size: 1em;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

// Стилизация контейнера содержимого модального окна (если нужно)
const FactionModalOverlay = styled(motion.div)`
    /* Можно добавить дополнительные стили или анимации */
`;

const MyFaction = ({ character }) => {
    const [faction, setFaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchFaction = async () => {
            console.log('Fetching faction for character ID:', character.id);
            if (character.currentFactionId) {
                try {
                    console.log('Fetching faction for character ID:', character.id);
                    const response = api.get(`/factions/character/${character.id}`)
                    console.log('Faction data received:', response.data);
                    setFaction(response.data);
                } catch (error) {
                    console.error('Ошибка при загрузке информации о фракции:', error);
                    toast.error('Не удалось загрузить информацию о вашей фракции.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchFaction();
    }, [character.currentFactionId, character.id]);

    const handleOpenModal = () => {
        if (faction) {
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return null; // Можно добавить индикатор загрузки, если необходимо
    }

    if (!character.currentFactionId || !faction) {
        return (
            <MyFactionContainer title="Вы не состоите во фракции">
                <NoFactionText>Без фракции</NoFactionText>
            </MyFactionContainer>
        );
    }

    return (
        <>
            <MyFactionContainer onClick={handleOpenModal} title="Моя Фракция">
                <FactionAvatar
                    src={faction.imageUrl} // Предполагается, что API возвращает поле imageUrl
                    alt={`${faction.name} Avatar`}
                />
            </MyFactionContainer>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <FactionModalContent faction={faction} />
            </Modal>
        </>
    );
};

MyFaction.propTypes = {
    character: PropTypes.shape({
        id: PropTypes.number.isRequired,
        currentFactionId: PropTypes.number,
        currentFactionName: PropTypes.string,
        // Другие поля персонажа при необходимости
    }).isRequired,
};

export default MyFaction;
