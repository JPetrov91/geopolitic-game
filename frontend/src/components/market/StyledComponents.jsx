// src/components/StyledComponents.jsx

import styled from 'styled-components';

// Общие стили для кнопок покупки
export const BuyButton = styled.button`
    padding: 10px 20px;
    background-color: #e67e22; /* Оранжевая кнопка */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #d35400;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
    }
`;

// Общие стили для кнопок отправки форм
export const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #e74c3c; /* Красная кнопка */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #c0392b;
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }

    &:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
    }
`;

// Общие стили для инпутов
export const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #34495e;
    border-radius: 5px;
    background-color: rgba(236, 240, 241, 0.2);
    color: #ecf0f1;
    font-size: 1em;

    &:focus {
        outline: none;
        border-color: #e74c3c;
    }
`;

// Общие стили для кнопки сброса фильтров
export const ClearFiltersButton = styled.button`
    padding: 10px 20px;
    background-color: #c0392b; /* Красная кнопка */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #96281b;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;
