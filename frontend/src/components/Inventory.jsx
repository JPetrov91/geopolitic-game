// src/components/Inventory.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaOilCan, FaHammer, FaTree } from 'react-icons/fa';
import api from "../api"; // Используем иконки из react-icons

// Стилизация основного контейнера инвентаря
const InventoryContainer = styled.div`
    padding: 20px;
    background: rgba(44, 62, 80, 0.9); /* Полупрозрачный тёмно-синий фон */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    color: #ecf0f1;
    max-width: 600px;
    margin: 20px auto;
    text-align: center;

    @media (max-width: 500px) {
        width: 90%;
    }
`;

// Стилизация контейнера для ресурсов
const ResourcesContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`;

// Стилизация отдельного ресурса
const ResourceCard = styled.div`
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid #34495e;
    border-radius: 8px;
    padding: 15px;
    margin: 10px;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
    }

    @media (max-width: 400px) {
        width: 100px;
        padding: 10px;
    }
`;

// Стилизация иконки ресурса
const ResourceIcon = styled.div`
    font-size: 2em;
    margin-bottom: 10px;
    color: ${props => props.color || '#ecf0f1'};
`;

// Стилизация названия ресурса
const ResourceName = styled.span`
    font-size: 1em;
    color: #bdc3c7;
    margin-bottom: 5px;
`;

// Стилизация количества ресурса
const ResourceAmount = styled.span`
    font-size: 1.2em;
    color: #ecf0f1;
    font-weight: bold;
`;

// Стилизация кнопки "Создать"
const CreateButton = styled.button`
    position: absolute;
    bottom: 10px;
    padding: 5px 10px;
    background-color: #2ecc71;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    opacity: ${props => (props.visible ? 1 : 0)};
    visibility: ${props => (props.visible ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease, visibility 0.3s ease;

    &:hover {
        background-color: #27ae60;
    }

    &:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
    }
`;

// Стилизация сообщения об ошибке
const ErrorMessage = styled.p`
    color: #e74c3c;
    text-align: center;
    margin-top: 15px;
`;

// Стилизация сообщения о загрузке
const LoadingMessage = styled.p`
    color: #3498db;
    text-align: center;
    margin-top: 15px;
`;

// Иконки ресурсов с цветами
const OilIcon = () => <FaOilCan color="#f1c40f" />;
const OreIcon = () => <FaHammer color="#7f8c8d" />;
const WoodIcon = () => <FaTree color="#27ae60" />;

const Inventory = ({ storageId }) => {
    const [storageData, setStorageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedResource, setSelectedResource] = useState(null);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        const fetchStorage = async () => {
            setLoading(true);
            setError('');
            try {
                const response = api.get(`/storages/${storageId}`)
                    .then(response => response.data)
                setStorageData(response.data);
                toast.success('Инвентарь успешно загружен!');
            } catch (err) {
                console.error('Ошибка при получении данных склада:', err);
                setError('Не удалось загрузить данные инвентаря.');
                toast.error('Ошибка при загрузке инвентаря.');
            } finally {
                setLoading(false);
            }
        };

        fetchStorage();
    }, [storageId]);

    const handleCreate = async (resourceType) => {
        setCreating(true);
        try {
            const response = api.post(`/api/storages/${storageId}/addResource`, {
                resourceType: resourceType,
                amount: 1
            }).then(response => response.data)
            // Предполагается, что API возвращает обновлённые данные склада
            setStorageData(response.data);
            toast.success(`1 единица ${resourceType} успешно создана!`);
        } catch (err) {
            console.error(`Ошибка при создании ${resourceType}:`, err);
            toast.error(`Не удалось создать ${resourceType}.`);
        } finally {
            setCreating(false);
            setSelectedResource(null);
        }
    };

    const toggleCreateButton = (resourceType) => {
        if (selectedResource === resourceType) {
            setSelectedResource(null);
        } else {
            setSelectedResource(resourceType);
        }
    };

    return (
        <InventoryContainer>
            {loading && <LoadingMessage>Загрузка данных инвентаря...</LoadingMessage>}

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {storageData && (
                <ResourcesContainer>
                    <ResourceCard onClick={() => toggleCreateButton('oil')}>
                        <ResourceIcon>
                            <OilIcon />
                        </ResourceIcon>
                        <ResourceName>Нефть</ResourceName>
                        <ResourceAmount>{storageData.oilAmount}</ResourceAmount>
                        <CreateButton
                            visible={selectedResource === 'oil'}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCreate('oil');
                            }}
                            disabled={creating}
                        >
                            Создать
                        </CreateButton>
                    </ResourceCard>
                    <ResourceCard onClick={() => toggleCreateButton('ore')}>
                        <ResourceIcon>
                            <OreIcon />
                        </ResourceIcon>
                        <ResourceName>Руда</ResourceName>
                        <ResourceAmount>{storageData.oreAmount}</ResourceAmount>
                        <CreateButton
                            visible={selectedResource === 'ore'}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCreate('ore');
                            }}
                            disabled={creating}
                        >
                            Создать
                        </CreateButton>
                    </ResourceCard>
                    <ResourceCard onClick={() => toggleCreateButton('wood')}>
                        <ResourceIcon>
                            <WoodIcon />
                        </ResourceIcon>
                        <ResourceName>Дерево</ResourceName>
                        <ResourceAmount>{storageData.woodAmount}</ResourceAmount>
                        <CreateButton
                            visible={selectedResource === 'wood'}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCreate('wood');
                            }}
                            disabled={creating}
                        >
                            Создать
                        </CreateButton>
                    </ResourceCard>
                </ResourcesContainer>
            )}
        </InventoryContainer>
    );
};

Inventory.propTypes = {
    storageId: PropTypes.number.isRequired,
};

export default Inventory;
