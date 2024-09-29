// src/components/Market.jsx

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaStore, FaTimes } from 'react-icons/fa';
import marketApi from "../marketApi"; // Убедитесь, что этот файл правильно экспортирует настроенный axios-инстанс

// Анимация для кнопок
const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
`;

// Стилизация основного контейнера рынка
const MarketContainer = styled.div`
    padding: 20px;
    background: rgba(44, 62, 80, 0.95); /* Полупрозрачный тёмно-синий фон */
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
    color: #ecf0f1;
    max-width: 1200px;
    margin: 20px auto;
`;

// Стилизация кнопки "Выставить товар на продажу"
const ListItemButton = styled.button`
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

// Стилизация контейнера для карточек товаров
const ItemsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

// Стилизация отдельной карточки товара
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

// Стилизация заголовка карточки товара
const ItemName = styled.h3`
    margin-bottom: 10px;
    color: #fff;
    font-size: 1.5em;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

// Стилизация информации о товаре
const ItemInfo = styled.p`
    margin: 5px 0;
    color: #bdc3c7;
    font-size: 1em;
`;

// Стилизация кнопки "Купить"
const BuyButton = styled.button`
    padding: 10px;
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

// Стилизация модального окна
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(44, 62, 80, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

// Стилизация содержимого модального окна
const ModalContent = styled.div`
    background: #2c3e50;
    padding: 30px;
    border-radius: 10px;
    width: 500px;
    color: #ecf0f1;
    position: relative;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);

    @media (max-width: 600px) {
        width: 90%;
    }
`;

// Стилизация заголовка модального окна
const ModalTitle = styled.h3`
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.8em;
`;

// Стилизация полей ввода
const Input = styled.input`
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

// Стилизация кнопки отправки формы
const SubmitButton = styled.button`
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

// Стилизация кнопки закрытия модального окна
const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    color: #ecf0f1;
    font-size: 1.5em;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #e74c3c;
    }
`;

// Стилизация сообщения об ошибке
const ErrorMessage = styled.p`
    color: #e74c3c;
    text-align: center;
    margin-top: 15px;
    font-size: 1.1em;
`;

// Стилизация сообщения о загрузке
const LoadingMessage = styled.p`
    color: #3498db;
    text-align: center;
    margin-top: 15px;
    font-size: 1.2em;
`;

const Market = ({ characterId }) => {
    const [marketItems, setMarketItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: 1,
        price: 0,
    });
    const [submitting, setSubmitting] = useState(false);
    const [buyingItemId, setBuyingItemId] = useState(null); // Для управления состоянием покупки

    useEffect(() => {
        const fetchMarketItems = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await marketApi.get('/market/items'); // Убедитесь, что путь правильный
                if (Array.isArray(response.data)) {
                    setMarketItems(response.data);
                } else {
                    throw new Error('Некорректный формат данных от сервера.');
                }
            } catch (err) {
                console.error('Ошибка при загрузке товаров рынка:', err);
                setError('Не удалось загрузить товары рынка.');
                toast.error('Ошибка при загрузке товаров рынка.');
            } finally {
                setLoading(false);
            }
        };

        fetchMarketItems();
    }, []);

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
            const response = await marketApi.post('/market/items', payload); // Убедитесь, что путь правильный
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

    const handleBuy = async (itemId) => {
        setBuyingItemId(itemId);
        try {
            const response = await marketApi.post(`/market/items/${itemId}/buy`, {
                buyerId: characterId,
            });
            if (response.status === 200 || response.status === 204) {
                setMarketItems(prevItems => prevItems.filter(item => item.id !== itemId));
                toast.success('Товар успешно куплен!');
            } else {
                throw new Error(response.data.message || 'Не удалось купить товар.');
            }
        } catch (err) {
            console.error('Ошибка при покупке товара:', err);
            toast.error(err.message || 'Не удалось купить товар.');
        } finally {
            setBuyingItemId(null);
        }
    };

    return (
        <MarketContainer>
            <ListItemButton onClick={openModal}>
                <FaStore /> Выставить товар на продажу
            </ListItemButton>

            {loading ? (
                <LoadingMessage>Загрузка товаров рынка...</LoadingMessage>
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <ItemsGrid>
                    {marketItems.map(item => (
                        <ItemCard key={item.id}>
                            <ItemName>{item.name}</ItemName>
                            <ItemInfo><strong>Количество:</strong> {item.quantity}</ItemInfo>
                            <ItemInfo><strong>Цена:</strong> {item.price.toFixed(2)} ₽</ItemInfo>
                            <ItemInfo><strong>Продавец:</strong> {item.sellerName}</ItemInfo>
                            <BuyButton
                                onClick={() => handleBuy(item.id)}
                                disabled={buyingItemId === item.id}
                            >
                                {buyingItemId === item.id ? 'Покупка...' : 'Купить'}
                            </BuyButton>
                        </ItemCard>
                    ))}
                </ItemsGrid>
            )}

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        <CloseButton onClick={closeModal} aria-label="Закрыть модальное окно">
                            <FaTimes />
                        </CloseButton>
                        <ModalTitle>Выставить товар на продажу</ModalTitle>
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Название товара"
                                value={newItem.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                type="number"
                                name="quantity"
                                placeholder="Количество"
                                value={newItem.quantity}
                                onChange={handleInputChange}
                                min="1"
                                required
                            />
                            <Input
                                type="number"
                                name="price"
                                placeholder="Цена за единицу (₽)"
                                value={newItem.price}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                required
                            />
                            <SubmitButton type="submit" disabled={submitting}>
                                {submitting ? 'Создание...' : 'Создать'}
                            </SubmitButton>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </MarketContainer>
    );
};

Market.propTypes = {
    characterId: PropTypes.number.isRequired,
};

export default Market;
