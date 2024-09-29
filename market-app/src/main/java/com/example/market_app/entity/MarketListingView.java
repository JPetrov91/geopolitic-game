package com.example.market_app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "market_listings")
public class MarketListingView {

    @Id
    private String listingId;
    private String itemName;
    private Integer quantity;
    private BigDecimal price;
    private String sellerId;
    private String status;
    private Long createdAt;
    private Long updatedAt;
}
