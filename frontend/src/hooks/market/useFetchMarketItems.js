// src/hooks/useFetchMarketItems.js

import { useState, useEffect } from 'react';
import marketApi from '../../marketApi';
import { toast } from 'react-toastify';

const useFetchMarketItems = () => {
    const [marketItems, setMarketItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMarketItems = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await marketApi.get('/market/active');
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

    return { marketItems, loading, error, setMarketItems };
};

export default useFetchMarketItems;
