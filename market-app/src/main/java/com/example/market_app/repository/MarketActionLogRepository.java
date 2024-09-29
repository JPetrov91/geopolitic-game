package com.example.market_app.repository;

import com.example.market_app.entity.MarketActionLogView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarketActionLogRepository extends JpaRepository<MarketActionLogView, String> {
    List<MarketActionLogView> findByListingId(String listingId);
}
