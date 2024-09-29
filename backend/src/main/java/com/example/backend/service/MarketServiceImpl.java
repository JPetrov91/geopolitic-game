package com.example.backend.service;

import com.example.backend.dto.ResourceRequestDTO;
import com.example.backend.entity.MarketItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MarketServiceImpl implements MarketService {

    @Override
    public List<MarketItem> getAllMarketItems() {
        MarketItem marketItem = new MarketItem();
        marketItem.setName("Железо");
        marketItem.setId(1L);
        marketItem.setQuantity(168);
        marketItem.setPrice(27.0);
        marketItem.setSellerName("John Smith");

        MarketItem marketItem2 = new MarketItem();
        marketItem2.setName("Алюминий");
        marketItem2.setId(2L);
        marketItem2.setQuantity(57);
        marketItem2.setPrice(41.0);
        marketItem2.setSellerName("Joe Biden");

        List<MarketItem> marketItems = new ArrayList<>();
        marketItems.add(marketItem2);
        marketItems.add(marketItem);
        return marketItems;
    }

    @Override
    public MarketItem listItemForSale(ResourceRequestDTO resourceRequestDTO) {
        return new MarketItem();
    }
}
