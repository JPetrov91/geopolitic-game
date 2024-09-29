package com.example.backend.service;

import com.example.backend.dto.ResourceRequestDTO;
import com.example.backend.entity.MarketItem;

import java.util.List;

public interface MarketService {

    List<MarketItem> getAllMarketItems();

    MarketItem listItemForSale(ResourceRequestDTO resourceRequestDTO);
}
