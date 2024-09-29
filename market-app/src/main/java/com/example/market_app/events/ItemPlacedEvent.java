package com.example.market_app.events;

import lombok.Value;

import java.math.BigDecimal;

@Value
public class ItemPlacedEvent {
    private final String listingId;
    private final String itemName;
    private final Integer quantity;
    private final BigDecimal price;
    private final String sellerId;
    private final Long timestamp;
}
