package com.example.market_app.controllers;

import com.example.market_app.dto.PlaceItemRequest;
import com.example.market_app.entity.MarketActionLogView;
import com.example.market_app.entity.MarketListingView;
import com.example.market_app.services.MarketListingService;
import com.example.market_app.services.MarketLogActionService;
import com.example.market_app.services.MarketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/market")
@RequiredArgsConstructor
public class MarketController {

    private final MarketListingService marketListingService;

    private final MarketLogActionService marketLogActionService;

    private final MarketService marketService;

    // Эндпоинт для размещения товара на рынке
    @PostMapping("/list")
    public CompletableFuture<ResponseEntity<String>> placeItemOnMarket(@RequestBody PlaceItemRequest request) {
        return marketService.placeItemOnMarket(request)
                .thenApply(ResponseEntity::ok)
                .exceptionally(ex -> ResponseEntity.badRequest().body(ex.getMessage()));
    }

    // Эндпоинт для покупки товара
    @PostMapping("/buy/{listingId}")
    public CompletableFuture<ResponseEntity<String>> buyItem(@PathVariable String listingId, @RequestParam String buyerId) {
        return marketService.buyItem(listingId, buyerId)
                .thenApply(result -> ResponseEntity.ok("Item purchased successfully."))
                .exceptionally(ex -> ResponseEntity.badRequest().body(ex.getMessage()));
    }

    // Эндпоинт для получения активных листингов
    @GetMapping("/active")
    public ResponseEntity<List<MarketListingView>> getActiveListings() {
        List<MarketListingView> activeMarketListings = marketListingService.getAllMarketListings();
        return ResponseEntity.ok(activeMarketListings);
    }

    @GetMapping("/logs/{listingId}")
    public ResponseEntity<List<MarketActionLogView>> getActionLogs(@PathVariable String listingId) {
        List<MarketActionLogView> logs = marketLogActionService.getAllActionForMarketListing(listingId);
        return ResponseEntity.ok(logs);
    }

    // Дополнительные эндпоинты для истории и других операций
}
