package com.example.market_app.services.impl;

import com.example.market_app.entity.MarketListingView;
import com.example.market_app.repository.MarketListingRepository;
import com.example.market_app.services.MarketListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketListingServiceImpl implements MarketListingService {

    private final MarketListingRepository marketListingRepository;
    @Override
    public List<MarketListingView> getAllMarketListings() {
        return marketListingRepository.findAll().stream()
                .filter(listing -> "ACTIVE".equals(listing.getStatus()))
                .toList();
    }
}
