package com.example.market_app.commands;

import lombok.Value;

@Value
public class BuyItemCommand {
    private final String listingId;
    private final String buyerId;
}
