// src/components/MarketItemCard.jsx

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BuyButton } from './StyledComponents'; // Создадим отдельный файл для общих стилей кнопок

const ItemCard = styled.div`
    background-color: rgba(236, 240, 241, 0.1);
    border: 1px solid #34495e;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    }
`;

const ItemName = styled.h3`
    margin-bottom: 10px;
    color: #fff;
    font-size: 1.5em;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

const ItemInfo = styled.p`
    margin: 5px 0;
    color: #bdc3c7;
    font-size: 1em;
`;

const MarketItemCard = ({ item, onBuy, isBuying }) => (
    <ItemCard>
        <div>
            <ItemName>{item.name}</ItemName>
            <ItemInfo><strong>Количество:</strong> {item.quantity}</ItemInfo>
            <ItemInfo><strong>Цена:</strong> {item.price.toFixed(2)} ₽</ItemInfo>
            <ItemInfo><strong>Продавец:</strong> {item.sellerName}</ItemInfo>
        </div>
        <BuyButton
            onClick={() => onBuy(item.id)}
            disabled={isBuying}
            aria-label={`Купить ${item.name}`}
        >
            {isBuying ? 'Покупка...' : 'Купить'}
        </BuyButton>
    </ItemCard>
);

MarketItemCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        sellerName: PropTypes.string.isRequired,
    }).isRequired,
    onBuy: PropTypes.func.isRequired,
    isBuying: PropTypes.bool,
};

MarketItemCard.defaultProps = {
    isBuying: false,
};

export default MarketItemCard;
