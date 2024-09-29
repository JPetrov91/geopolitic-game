package com.example.market_app.services.impl;

import com.example.market_app.commands.BuyItemCommand;
import com.example.market_app.commands.PlaceItemCommand;
import com.example.market_app.dto.PlaceItemRequest;
import com.example.market_app.services.MarketService;
import lombok.RequiredArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {

    private final CommandGateway commandGateway;
    @Override
    public CompletableFuture<Object> buyItem(String itemId, String buyerId) {
        BuyItemCommand command = new BuyItemCommand(itemId, buyerId);
        return commandGateway.send(command);
    }

    @Override
    public CompletableFuture<String> placeItemOnMarket(PlaceItemRequest placeItemRequest) {
        String listingId = UUID.randomUUID().toString();
        PlaceItemCommand command = new PlaceItemCommand(
                listingId,
                placeItemRequest.getItemName(),
                placeItemRequest.getQuantity(),
                placeItemRequest.getPrice(),
                placeItemRequest.getSellerId()
        );
        return commandGateway.send(command).thenApply(response -> listingId);
    }
}
