// src/components/Map.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from "react-toastify";
import api from '../api'; // Импортируйте ваш API Utility
import RegionItem from './RegionItem'; // Импортируем новый компонент

// Стилизация основного контейнера карты
const MapContainer = styled.div`
    padding: 20px;
    background: rgba(255, 255, 255, 0.1); /* Полупрозрачный белый фон */
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    color: #ecf0f1;
    max-width: 800px;
    margin: 0 auto;
`;

// Стилизация заголовка
const Title = styled.h3`
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8em;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

// Стилизация списка регионов
const RegionsList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

// Стилизация сообщения о загрузке
const LoadingMessage = styled.p`
    text-align: center;
    font-size: 1.2em;
    color: #fff;
`;

const Map = ({ characterId, currentRegionId, onCharacterUpdated }) => {
    const [regions, setRegions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movingRegionId, setMovingRegionId] = useState(null); // Для индикации загрузки при перемещении

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await api.get('/regions'); // Предполагается, что эндпоинт GET /regions возвращает список регионов
                setRegions(response.data);
            } catch (error) {
                console.error('Ошибка при получении регионов:', error);
                toast.error('Не удалось загрузить регионы.');
            } finally {
                setLoading(false);
            }
        };

        fetchRegions();
    }, []);

    const handleMove = async (regionId) => {
        setMovingRegionId(regionId);
        try {
            const response = await api.put(`/geolocation/${characterId}/${regionId}`);
            if (response.status === 200 || response.status === 201) {
                onCharacterUpdated(response.data); // Обновляем состояние персонажа с новым регионом
                toast.success('Вы успешно переехали в новый регион!');
            } else {
                toast.error('Не удалось переехать в выбранный регион.');
            }
        } catch (error) {
            console.error('Ошибка при переезде:', error);
            toast.error('Произошла ошибка при переезде.');
        } finally {
            setMovingRegionId(null);
        }
    };

    if (loading) {
        return (
            <MapContainer>
                <LoadingMessage>Загрузка регионов...</LoadingMessage>
            </MapContainer>
        );
    }

    return (
        <MapContainer>
            <Title>Список Регионов</Title>
            {regions.length === 0 ? (
                <LoadingMessage>Регионов не найдено.</LoadingMessage>
            ) : (
                <RegionsList>
                    {regions.map(region => (
                        <RegionItem
                            key={region.id}
                            region={region}
                            isCurrent={region.id === currentRegionId}
                            onMove={handleMove}
                            isMoving={movingRegionId === region.id}
                        />
                    ))}
                </RegionsList>
            )}
        </MapContainer>
    );
};

Map.propTypes = {
    characterId: PropTypes.number.isRequired,
    currentRegionId: PropTypes.number.isRequired,
    onCharacterUpdated: PropTypes.func.isRequired,
};

export default Map;
