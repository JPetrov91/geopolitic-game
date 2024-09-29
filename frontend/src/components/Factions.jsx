// src/components/Factions.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from "react-toastify";
import api from '../api'; // Импортируем API Utility
import FactionItem from './FactionItem'; // Импортируем новый компонент

// Стилизация основного контейнера фракций
const FactionsContainer = styled.div`
    padding: 20px;
    background: rgba(44, 62, 80, 0.9); /* Полупрозрачный тёмно-синий фон */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    color: #ecf0f1;
    max-width: 800px;
    margin: 0 auto;
`;

// Стилизация заголовка
const Title = styled.h3`
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
    font-size: 1.8em;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

// Стилизация списка фракций
const FactionsList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

// Стилизация сообщения о загрузке
const LoadingMessage = styled.p`
    text-align: center;
    font-size: 1.2em;
    color: #fff;
`;

const Factions = ({ character, setCharacter }) => {
    const [factions, setFactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [joiningFactionId, setJoiningFactionId] = useState(null); // Для индикации загрузки при вступлении

    useEffect(() => {
        const fetchFactions = async () => {
            try {
                const response = await api.get('/factions'); // Предполагаемый эндпоинт
                setFactions(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке фракций:', error);
                toast.error('Не удалось загрузить список фракций.');
            } finally {
                setLoading(false);
            }
        };

        fetchFactions();
    }, []);

    const handleJoinFaction = async (factionId) => {
        if (!character || character.currentFactionId) {
            toast.warn('Вы уже состоите во фракции.');
            return;
        }

        try {
            setJoiningFactionId(factionId);
            const response = await api.post(`/factions/character/${character.id}/add`, null, {
                params: { factionId }
            });
            toast.success('Вы успешно вступили во фракцию!');
            // Обновляем состояние персонажа
            setCharacter({
                ...character,
                currentFactionId: factionId,
                currentFactionName: factions.find(f => f.id === factionId)?.name || ''
            });
        } catch (error) {
            console.error('Ошибка при вступлении во фракцию:', error);
            toast.error('Не удалось вступить во фракцию.');
        } finally {
            setJoiningFactionId(null);
        }
    };

    if (loading) {
        return (
            <FactionsContainer>
                <LoadingMessage>Загрузка фракций...</LoadingMessage>
            </FactionsContainer>
        );
    }

    return (
        <FactionsContainer>
            <Title>Список Фракций</Title>
            {factions.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#bdc3c7' }}>Фракции отсутствуют.</p>
            ) : (
                <FactionsList>
                    {factions.map(faction => (
                        <FactionItem
                            key={faction.id}
                            faction={faction}
                            character={character}
                            handleJoinFaction={handleJoinFaction}
                            joiningFactionId={joiningFactionId}
                        />
                    ))}
                </FactionsList>
            )}
        </FactionsContainer>
    );
};

Factions.propTypes = {
    character: PropTypes.shape({
        id: PropTypes.number.isRequired,
        currentFactionId: PropTypes.number,
        currentFactionName: PropTypes.string
    }).isRequired,
    setCharacter: PropTypes.func.isRequired
};

export default Factions;
