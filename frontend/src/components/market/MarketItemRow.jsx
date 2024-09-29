// src/components/MarketItemRow.jsx

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BuyButton } from './StyledComponents'; // Общие стили кнопок

const TableRow = styled.tr`
    background-color: rgba(236, 240, 241, 0.1);
    border-bottom: 1px solid #34495e;
    transition: background-color 0.3s ease;

    &:nth-child(even) {
        background-color: rgba(236, 240, 241, 0.05);
    }

    &:hover {
        background-color: rgba(236, 240, 241, 0.2);
    }
`;

const TableData = styled.td`
    padding: 12px;
    color: #ecf0f1;
    text-align: center;
    font-size: 1em;
`;

const MarketItemRow = ({ item, onBuy, isBuying }) => (
    <TableRow>
        <TableData>{item.name}</TableData>
        <TableData>{item.quantity}</TableData>
        <TableData>{item.price.toFixed(2)} ₽</TableData>
        <TableData>{item.sellerName}</TableData>
        <TableData>
            <BuyButton
                onClick={() => onBuy(item.id)}
                disabled={isBuying}
                aria-label={`Купить ${item.name}`}
            >
                {isBuying ? 'Покупка...' : 'Купить'}
            </BuyButton>
        </TableData>
    </TableRow>
);

MarketItemRow.propTypes = {
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

MarketItemRow.defaultProps = {
    isBuying: false,
};

export default MarketItemRow;
