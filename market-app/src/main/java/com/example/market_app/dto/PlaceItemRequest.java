package com.example.market_app.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PlaceItemRequest {
    private String itemName;
    private Integer quantity;
    private BigDecimal price;
    private String sellerId;
}
