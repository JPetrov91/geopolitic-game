package com.example.market_app.repository;

import com.example.market_app.entity.MarketListingView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketListingRepository extends JpaRepository<MarketListingView, String> {
    // Дополнительные методы поиска по необходимости
}
