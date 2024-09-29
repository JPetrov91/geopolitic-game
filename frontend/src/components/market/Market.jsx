// src/components/Market.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import MarketHeader from './MarketHeader';
import MarketFilters from './MarketFilters';
import MarketTable from './MarketTable';
import AddItemModal from './AddItemModal';
import useFetchMarketItems from '../../hooks/market/useFetchMarketItems';
import useHandleBuy from '../../hooks/market/useHandleBuy';
import useMarketFilters from '../../hooks/market/useMarketFilters';
import marketApi from "../../marketApi"; // Импортируйте marketApi

const LoadingMessage = styled.p`
    color: #3498db;
    text-align: center;
    margin-top: 15px;
    font-size: 1.2em;
`;

const ErrorMessage = styled.p`
    color: #e74c3c;
    text-align: center;
    margin-top: 15px;
    font-size: 1.1em;
`;

const MarketContainer = styled.div`
    padding: 20px;
    background: rgba(44, 62, 80, 0.95); /* Полупрозрачный тёмно-синий фон */
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    color: #ecf0f1;
    max-width: 1200px;
    margin: 20px auto;
`;

const Market = ({ characterId }) => {
    const { marketItems, loading, error, setMarketItems } = useFetchMarketItems();
    const { handleBuy, buyingItemId } = useHandleBuy(setMarketItems, characterId);
    const {
        searchName,
        setSearchName,
        filterSeller,
        setFilterSeller,
        priceMin,
        setPriceMin,
        priceMax,
        setPriceMax,
        sortConfig,
        requestSort,
        getSortIndicator,
        sortedAndFilteredItems,
        clearFilters,
    } = useMarketFilters(marketItems);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: 1,
        price: 0,
    });
    const [submitting, setSubmitting] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewItem({
            name: '',
            quantity: 1,
            price: 0,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                ...newItem,
                sellerId: characterId,
            };
            const response = await marketApi.post('/market/items', payload);
            if (response.status === 201 || response.status === 200) {
                setMarketItems(prevItems => [...prevItems, response.data]);
                toast.success('Товар успешно выставлен на продажу!');
                closeModal();
            } else {
                throw new Error(response.data.message || 'Не удалось выставить товар на продажу.');
            }
        } catch (err) {
            console.error('Ошибка при выставлении товара на продажу:', err);
            toast.error(err.message || 'Не удалось выставить товар на продажу.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <MarketContainer>
            <MarketHeader onAddItem={openModal} />

            {/* Фильтры */}
            <MarketFilters
                searchName={searchName}
                setSearchName={setSearchName}
                filterSeller={filterSeller}
                setFilterSeller={setFilterSeller}
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                clearFilters={clearFilters}
            />

            {/* Таблица товаров */}
            {loading ? (
                <LoadingMessage>Загрузка товаров рынка...</LoadingMessage>
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <MarketTable
                    items={sortedAndFilteredItems}
                    handleBuy={handleBuy}
                    buyingItemId={buyingItemId}
                    requestSort={requestSort}
                    getSortIndicator={getSortIndicator}
                />
            )}

            <AddItemModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                newItem={newItem}
                onChange={handleInputChange}
                isSubmitting={submitting}
            />
        </MarketContainer>
    );
};

Market.propTypes = {
    characterId: PropTypes.number.isRequired,
};

export default Market;
