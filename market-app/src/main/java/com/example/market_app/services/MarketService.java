package com.example.market_app.services;

import com.example.market_app.dto.PlaceItemRequest;

import java.util.Objects;
import java.util.concurrent.CompletableFuture;

public interface MarketService {

    CompletableFuture<Object> buyItem(String itemId, String buyerId);

    CompletableFuture<String> placeItemOnMarket(PlaceItemRequest placeItemRequest);
}
