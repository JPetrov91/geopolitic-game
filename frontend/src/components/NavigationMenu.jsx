// src/components/NavigationMenu.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FaBoxOpen, FaTools, FaLandmark, FaMapMarkedAlt, FaUsers, FaStore } from 'react-icons/fa'; // Импортируем иконки

// Стилизация навигационного контейнера
const Nav = styled.nav`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

// Общий стиль для иконок навигации
const NavIcon = styled.div`
    color: ${props => (props.active ? '#e74c3c' : '#ecf0f1')}; /* Красный для активной иконки, светлый для остальных */
    font-size: 1.8em;
    cursor: pointer;
    transition: transform 0.3s ease, color 0.3s ease;

    &:hover {
        transform: scale(1.2);
        color: #e74c3c;
    }

    ${props =>
            props.active &&
            css`
                /* Дополнительные стили для активной иконки */
                border-bottom: 2px solid #e74c3c;
                padding-bottom: 2px;
            `}
`;

// Определение иконок для каждого раздела
const iconMapping = {
    inventory: <FaBoxOpen />,
    work: <FaTools />,
    parliament: <FaLandmark />,
    map: <FaMapMarkedAlt />,
    factions: <FaUsers />,
    market: <FaStore />, // Добавляем иконку для "Рынок"
};

const NavigationMenu = ({ activeSection, onNavigate }) => (
    <Nav aria-label="Основное меню">
        {['inventory', 'work', 'parliament', 'map', 'factions', 'market'].map((section) => (
            <NavIcon
                key={section}
                active={activeSection === section}
                onClick={() => onNavigate(section)}
                aria-label={section.charAt(0).toUpperCase() + section.slice(1)}
                aria-current={activeSection === section ? 'page' : undefined}
            >
                {iconMapping[section]}
            </NavIcon>
        ))}
    </Nav>
);

NavigationMenu.propTypes = {
    activeSection: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
};

export default NavigationMenu;
