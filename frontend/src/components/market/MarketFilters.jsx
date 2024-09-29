// src/components/MarketFilters.jsx

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ClearFiltersButton } from './StyledComponents'; // Общие стили кнопок

const FiltersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    background-color: rgba(44, 62, 80, 0.9);
    padding: 15px;
    border-radius: 10px;
`;

const FilterGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 5px;
    color: #ecf0f1;
    font-weight: bold;
`;

const InputField = styled.input`
    padding: 8px;
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

const MarketFilters = ({
                           searchName,
                           setSearchName,
                           filterSeller,
                           setFilterSeller,
                           priceMin,
                           setPriceMin,
                           priceMax,
                           setPriceMax,
                           clearFilters,
                       }) => (
    <FiltersContainer>
        <FilterGroup>
            <Label htmlFor="searchName">Поиск по названию:</Label>
            <InputField
                type="text"
                id="searchName"
                name="searchName"
                placeholder="Введите название товара"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                aria-label="Поиск по названию"
            />
        </FilterGroup>

        <FilterGroup>
            <Label htmlFor="filterSeller">Фильтр по продавцу:</Label>
            <InputField
                type="text"
                id="filterSeller"
                name="filterSeller"
                placeholder="Введите имя продавца"
                value={filterSeller}
                onChange={(e) => setFilterSeller(e.target.value)}
                aria-label="Фильтр по продавцу"
            />
        </FilterGroup>

        <FilterGroup>
            <Label htmlFor="priceMin">Минимальная цена (₽):</Label>
            <InputField
                type="number"
                id="priceMin"
                name="priceMin"
                placeholder="0"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                min="0"
                aria-label="Минимальная цена"
            />
        </FilterGroup>

        <FilterGroup>
            <Label htmlFor="priceMax">Максимальная цена (₽):</Label>
            <InputField
                type="number"
                id="priceMax"
                name="priceMax"
                placeholder="0"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                min="0"
                aria-label="Максимальная цена"
            />
        </FilterGroup>

        <FilterGroup style={{ alignSelf: 'flex-end' }}>
            <ClearFiltersButton onClick={clearFilters}>
                Сбросить фильтры
            </ClearFiltersButton>
        </FilterGroup>
    </FiltersContainer>
);

MarketFilters.propTypes = {
    searchName: PropTypes.string.isRequired,
    setSearchName: PropTypes.func.isRequired,
    filterSeller: PropTypes.string.isRequired,
    setFilterSeller: PropTypes.func.isRequired,
    priceMin: PropTypes.string.isRequired,
    setPriceMin: PropTypes.func.isRequired,
    priceMax: PropTypes.string.isRequired,
    setPriceMax: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
};

export default MarketFilters;
