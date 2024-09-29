package com.example.market_app.services;

import com.example.market_app.entity.MarketActionLogView;

import java.util.List;

public interface MarketLogActionService {

    List<MarketActionLogView> getAllActionForMarketListing(String listingId);
}
