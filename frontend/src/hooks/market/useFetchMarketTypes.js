// src/hooks/useFetchMarketTypes.js

import { useState, useEffect } from 'react';
import marketApi from '../../marketApi';
import { toast } from 'react-toastify';

const useFetchMarketTypes = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTypes = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await marketApi.get('/market/types'); // Предполагаемый эндпоинт
                if (Array.isArray(response.data)) {
                    setTypes(response.data);
                } else {
                    throw new Error('Некорректный формат данных от сервера.');
                }
            } catch (err) {
                console.error('Ошибка при загрузке типов товаров:', err);
                setError('Не удалось загрузить типы товаров.');
                toast.error('Ошибка при загрузке типов товаров.');
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    return { types, loading, error };
};

export default useFetchMarketTypes;
