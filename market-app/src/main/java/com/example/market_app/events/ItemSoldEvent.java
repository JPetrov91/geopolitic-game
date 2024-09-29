package com.example.market_app.events;

import lombok.Value;

import java.math.BigDecimal;

@Value
public class ItemSoldEvent {
    private final String listingId;
    private final String buyerId;
    private final Integer quantity;
    private final BigDecimal totalPrice;
    private final Long timestamp;
}
