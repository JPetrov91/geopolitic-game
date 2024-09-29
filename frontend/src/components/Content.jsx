// src/components/Content.jsx
import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Ленивая загрузка компонентов
const Map = lazy(() => import('./Map'));
const Factions = lazy(() => import('./Factions'));
const Inventory = lazy(() => import('./Inventory'));
const Market = lazy(() => import('./market/Market'));
// Импортируйте другие компоненты по необходимости

// Стилизация контейнера содержимого
const ContentContainer = styled.div`
    padding: 10px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1); /* Полупрозрачный белый фон для содержимого */
    color: #ecf0f1; /* Цвет текста для лучшей читаемости */
`;

const Content = ({ activeSection, character, setCharacter }) => {
    const renderContent = () => {
        switch (activeSection) {
            case 'inventory':
                return (
                    <Suspense fallback={<div>Загрузка инвентаря...</div>}>
                        <Inventory
                            storageId={character.storageId}>
                        </Inventory>
                    </Suspense>
                );
            case 'work':
                return (
                    <div>
                        <h3>Работа</h3>
                        <p>Здесь будет отображаться информация о работе.</p>
                        {/* Добавьте функционал работы по необходимости */}
                    </div>
                );
            case 'parliament':
                return (
                    <div>
                        <h3>Парламент</h3>
                        <p>Здесь будет отображаться информация о парламенте.</p>
                        {/* Добавьте функционал парламента по необходимости */}
                    </div>
                );
            case 'map':
                return (
                    <Suspense fallback={<div>Загрузка карты...</div>}>
                        <Map
                            characterId={character.id}
                            currentRegionId={character.currentRegionId}
                            onCharacterUpdated={setCharacter}
                        />
                    </Suspense>
                );
            case 'factions':
                return (
                    <Suspense fallback={<div>Загрузка фракций...</div>}>
                        <Factions character={character} setCharacter={setCharacter} />
                    </Suspense>
                );
            case 'market':
                return (
                    <Suspense fallback={<div>Загрузка рынка...</div>}>
                        <Market
                            characterId={character.id}>
                        </Market>
                    </Suspense>
                );
            default:
                return null;
        }
    };

    return <ContentContainer>{renderContent()}</ContentContainer>;
};

Content.propTypes = {
    activeSection: PropTypes.string.isRequired,
    character: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        currentRegionName: PropTypes.string,
        currentRegionId: PropTypes.number,
    }).isRequired,
    setCharacter: PropTypes.func.isRequired,
};

export default Content;
