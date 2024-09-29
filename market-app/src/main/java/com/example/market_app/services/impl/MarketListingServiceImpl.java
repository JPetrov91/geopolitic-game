package com.example.market_app.services.impl;

import com.example.market_app.entity.MarketListingView;
import com.example.market_app.repository.MarketListingRepository;
import com.example.market_app.services.MarketListingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MarketListingServiceImpl implements MarketListingService {

    private final MarketListingRepository marketListingRepository;
    @Override
    public List<MarketListingView> getAllMarketListings() {
        List<MarketListingView> activeMarketListings =  marketListingRepository.findAll().stream()
                .filter(listing -> "ACTIVE".equals(listing.getStatus()))
                .toList();

        return activeMarketListings.isEmpty() ? createMarketListingMock() : activeMarketListings;
    }

    public List<MarketListingView> createMarketListingMock() {
        MarketListingView marketListingView1 = new MarketListingView();
        marketListingView1.setListingId("1");
        marketListingView1.setPrice(BigDecimal.valueOf(27.0));
        marketListingView1.setQuantity(265);
        marketListingView1.setStatus("ACTIVE");
        marketListingView1.setItemName("Железо");
        marketListingView1.setSellerId("Barack Obama");
        marketListingView1.setCreatedAt(System.currentTimeMillis());
        marketListingView1.setUpdatedAt(System.currentTimeMillis());

        MarketListingView marketListingView2 = new MarketListingView();
        marketListingView2.setListingId("2");
        marketListingView2.setPrice(BigDecimal.valueOf(24));
        marketListingView2.setQuantity(350);
        marketListingView2.setStatus("ACTIVE");
        marketListingView2.setItemName("Газ");
        marketListingView2.setSellerId("Vladimir Putin");
        marketListingView2.setCreatedAt(System.currentTimeMillis());
        marketListingView2.setUpdatedAt(System.currentTimeMillis());
        return List.of(marketListingView1, marketListingView2);
    }
}
