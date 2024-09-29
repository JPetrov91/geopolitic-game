package com.example.market_app.events;

import lombok.Value;

import java.math.BigDecimal;

@Value
public class ItemSoldNotificationEvent {
    private final String sellerId;
    private final String itemName;
    private final String buyerId;
    private final Integer quantity;
    private final BigDecimal totalPrice;
    private final Long timestamp;
}