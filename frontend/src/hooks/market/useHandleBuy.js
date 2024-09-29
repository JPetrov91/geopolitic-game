// src/hooks/useHandleBuy.js

import { useState } from 'react';
import marketApi from '../../marketApi';
import { toast } from 'react-toastify';

const useHandleBuy = (setMarketItems, characterId) => {
    const [buyingItemId, setBuyingItemId] = useState(null);

    const handleBuy = async (itemId) => {
        setBuyingItemId(itemId);
        try {
            const response = await marketApi.post(`/market/buy/${itemId}`, {
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

    return { handleBuy, buyingItemId };
};

export default useHandleBuy;
