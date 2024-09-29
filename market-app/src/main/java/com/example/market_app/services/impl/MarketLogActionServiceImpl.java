package com.example.market_app.services.impl;

import com.example.market_app.entity.MarketActionLogView;
import com.example.market_app.repository.MarketActionLogRepository;
import com.example.market_app.services.MarketLogActionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketLogActionServiceImpl implements MarketLogActionService {

    private final MarketActionLogRepository marketActionLogRepository;
    @Override
    public List<MarketActionLogView> getAllActionForMarketListing(String listingId) {
        return marketActionLogRepository.findByListingId(listingId);
    }
}
