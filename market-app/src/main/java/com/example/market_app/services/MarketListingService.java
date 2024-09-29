package com.example.market_app.services;

import com.example.market_app.entity.MarketListingView;

import java.util.List;

public interface MarketListingService {

    List<MarketListingView> getAllMarketListings();
}
