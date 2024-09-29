// src/components/RegionItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Стилизация контейнера региона
const RegionItemContainer = styled(motion.li)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    margin-bottom: 15px;
    background: rgba(44, 62, 80, 0.9); /* Полупрозрачный тёмно-синий фон */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    color: #ecf0f1;
    transition: background 0.3s ease, transform 0.3s ease;

    &:hover {
        background: rgba(44, 62, 80, 1);
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
`;

// Стилизация названия региона
const RegionName = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    color: #f1c40f;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

// Стилизация кнопки "Переехать"
const MoveButton = styled.button`
    padding: 8px 16px;
    background-color: ${({ theme, disabled }) => (disabled ? theme.colors.muted : theme.colors.primary)};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    font-size: 0.95em;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${({ theme, disabled }) => (disabled ? theme.colors.muted : theme.colors.primaryHover)};
        transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-2px)')};
    }

    ${({ disabled }) =>
    disabled &&
    css`
            background-color: ${({ theme }) => theme.colors.muted};
        `}
`;

const RegionItem = React.memo(({ region, isCurrent, onMove, isMoving }) => (
    <RegionItemContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <RegionName>{region.name}</RegionName>
        {isCurrent ? (
            <MoveButton disabled={true}>Вы здесь</MoveButton>
        ) : (
            <MoveButton onClick={() => onMove(region.id)} disabled={isMoving}>
                {isMoving ? 'Переезд...' : 'Переехать'}
            </MoveButton>
        )}
    </RegionItemContainer>
));

RegionItem.propTypes = {
    region: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    isCurrent: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired,
    isMoving: PropTypes.bool.isRequired,
};

export default RegionItem;
