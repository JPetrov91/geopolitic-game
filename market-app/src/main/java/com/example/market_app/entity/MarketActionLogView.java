package com.example.market_app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "market_action_logs")
public class MarketActionLogView {

    @Id
    private String id;
    private String listingId;
    private String actionType;
    private String actorId;
    private Long timestamp;
}
