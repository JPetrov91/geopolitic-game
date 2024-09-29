package com.example.market_app.controllers;

import com.example.market_app.commands.BuyItemCommand;
import com.example.market_app.commands.PlaceItemCommand;
import com.example.market_app.dto.PlaceItemRequest;
import com.example.market_app.entity.MarketActionLogView;
import com.example.market_app.entity.MarketListingView;
import com.example.market_app.repository.MarketActionLogRepository;
import com.example.market_app.repository.MarketListingRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
public class MarketController {

    private final CommandGateway commandGateway;

    private final MarketListingRepository marketListingRepository;

    private final MarketActionLogRepository marketActionLogRepository;

    // Эндпоинт для размещения товара на рынке
    @PostMapping("/list")
    public CompletableFuture<ResponseEntity<String>> placeItemOnMarket(@RequestBody PlaceItemRequest request) {
        String listingId = UUID.randomUUID().toString();
        PlaceItemCommand command = new PlaceItemCommand(
                listingId,
                request.getItemName(),
                request.getQuantity(),
                request.getPrice(),
                request.getSellerId()
        );
        return commandGateway.send(command)
                .thenApply(result -> ResponseEntity.ok(listingId))
                .exceptionally(ex -> ResponseEntity.badRequest().body(ex.getMessage()));
    }

    // Эндпоинт для покупки товара
    @PostMapping("/buy/{listingId}")
    public CompletableFuture<ResponseEntity<String>> buyItem(@PathVariable String listingId, @RequestParam String buyerId) {
        BuyItemCommand command = new BuyItemCommand(listingId, buyerId);
        return commandGateway.send(command)
                .thenApply(result -> ResponseEntity.ok("Item purchased successfully."))
                .exceptionally(ex -> ResponseEntity.badRequest().body(ex.getMessage()));
    }

    // Эндпоинт для получения активных листингов
    @GetMapping("/active")
    public ResponseEntity<List<MarketListingView>> getActiveListings() {
        List<MarketListingView> listings = marketListingRepository.findAll().stream()
                .filter(listing -> "ACTIVE".equals(listing.getStatus()))
                .toList();
        return ResponseEntity.ok(listings);
    }

    @GetMapping("/logs/{listingId}")
    public ResponseEntity<List<MarketActionLogView>> getActionLogs(@PathVariable String listingId) {
        List<MarketActionLogView> logs = marketActionLogRepository.findByListingId(listingId);
        return ResponseEntity.ok(logs);
    }

    // Дополнительные эндпоинты для истории и других операций
}
