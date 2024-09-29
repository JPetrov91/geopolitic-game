package com.example.market_app.commands;

import lombok.Value;

import java.math.BigDecimal;

@Value
public class PlaceItemCommand {
    private final String listingId;
    private final String itemName;
    private final Integer quantity;
    private final BigDecimal price;
    private final String sellerId;
}
