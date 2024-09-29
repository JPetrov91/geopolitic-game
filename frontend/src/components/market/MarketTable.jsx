// src/components/MarketTable.jsx

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MarketItemRow from './MarketItemRow';

const TableContainer = styled.div`
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableHeader = styled.th`
    padding: 12px;
    background-color: #34495e;
    color: #ecf0f1;
    text-align: center;
    border-bottom: 2px solid #2c3e50;
    cursor: pointer;
    user-select: none;

    &:hover {
        background-color: #3d566e;
    }
`;

const SortIndicator = styled.span`
    margin-left: 5px;
    font-size: 0.8em;
`;

const MarketTable = ({
                         items,
                         handleBuy,
                         buyingItemId,
                         requestSort,
                         getSortIndicator,
                     }) => (
    <TableContainer>
        <Table>
            <thead>
            <tr>
                <TableHeader onClick={() => requestSort('name')}>
                    Название {getSortIndicator('name') && <SortIndicator>{getSortIndicator('name')}</SortIndicator>}
                </TableHeader>
                <TableHeader onClick={() => requestSort('quantity')}>
                    Количество {getSortIndicator('quantity') && <SortIndicator>{getSortIndicator('quantity')}</SortIndicator>}
                </TableHeader>
                <TableHeader onClick={() => requestSort('price')}>
                    Цена (₽) {getSortIndicator('price') && <SortIndicator>{getSortIndicator('price')}</SortIndicator>}
                </TableHeader>
                <TableHeader onClick={() => requestSort('sellerName')}>
                    Продавец {getSortIndicator('sellerName') && <SortIndicator>{getSortIndicator('sellerName')}</SortIndicator>}
                </TableHeader>
                <TableHeader>Действие</TableHeader>
            </tr>
            </thead>
            <tbody>
            {items.length > 0 ? (
                items.map(item => (
                    <MarketItemRow
                        key={item.id}
                        item={item}
                        onBuy={handleBuy}
                        isBuying={buyingItemId === item.id}
                    />
                ))
            ) : (
                <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                        Нет доступных товаров, соответствующих вашим фильтрам.
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    </TableContainer>
);

MarketTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            sellerName: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleBuy: PropTypes.func.isRequired,
    buyingItemId: PropTypes.number,
    requestSort: PropTypes.func.isRequired,
    getSortIndicator: PropTypes.func.isRequired,
};

MarketTable.defaultProps = {
    buyingItemId: null,
};

export default MarketTable;
