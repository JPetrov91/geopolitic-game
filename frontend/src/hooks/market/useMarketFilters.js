// src/hooks/useMarketFilters.js

import { useState, useMemo } from 'react';

const useMarketFilters = (items) => {
    // Состояния для фильтрации
    const [searchName, setSearchName] = useState('');
    const [filterSeller, setFilterSeller] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [filterType, setFilterType] = useState('Все'); // Добавлено состояние для типа товара

    // Состояния для сортировки
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending', // или 'descending'
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '▲' : '▼';
        }
        return '';
    };

    const sortedAndFilteredItems = useMemo(() => {
        let filteredItems = [...items];

        // Фильтрация по названию
        if (searchName) {
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        // Фильтрация по продавцу
        if (filterSeller) {
            filteredItems = filteredItems.filter(item =>
                item.sellerName.toLowerCase().includes(filterSeller.toLowerCase())
            );
        }

        // Фильтрация по диапазону цены
        if (priceMin !== '' && !isNaN(priceMin)) {
            filteredItems = filteredItems.filter(item => item.price >= parseFloat(priceMin));
        }
        if (priceMax !== '' && !isNaN(priceMax)) {
            filteredItems = filteredItems.filter(item => item.price <= parseFloat(priceMax));
        }

        // Фильтрация по типу товара
        if (filterType && filterType !== 'Все') {
            filteredItems = filteredItems.filter(item => item.type === filterType);
        }

        // Сортировка
        if (sortConfig.key !== null) {
            filteredItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredItems;
    }, [items, searchName, filterSeller, priceMin, priceMax, filterType, sortConfig]);

    const clearFilters = () => {
        setSearchName('');
        setFilterSeller('');
        setPriceMin('');
        setPriceMax('');
        setFilterType('Все'); // Сбросить тип товара
    };

    return {
        searchName,
        setSearchName,
        filterSeller,
        setFilterSeller,
        priceMin,
        setPriceMin,
        priceMax,
        setPriceMax,
        filterType,
        setFilterType,
        sortConfig,
        requestSort,
        getSortIndicator,
        sortedAndFilteredItems,
        clearFilters,
    };
};

export default useMarketFilters;
