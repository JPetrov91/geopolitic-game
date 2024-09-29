// src/components/MarketHeader.jsx

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaStore } from 'react-icons/fa';
import PropTypes from 'prop-types';

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    color: #ecf0f1;
    font-size: 2em;
`;

const AddButton = styled.button`
    padding: 12px 24px;
    background-color: #2ecc71; /* Зеленая кнопка */
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1em;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    animation: ${bounce} 2s infinite;

    &:hover {
        background-color: #27ae60;
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const MarketHeader = ({ onAddItem }) => (
    <HeaderContainer>
        <Title>Рынок</Title>
        <AddButton onClick={onAddItem}>
            <FaStore /> Выставить товар на продажу
        </AddButton>
    </HeaderContainer>
);

MarketHeader.propTypes = {
    onAddItem: PropTypes.func.isRequired,
};

export default MarketHeader;
