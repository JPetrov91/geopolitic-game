package com.example.market_app.projections;

import com.example.market_app.entity.MarketListingView;
import com.example.market_app.events.ItemPlacedEvent;
import com.example.market_app.events.ItemSoldEvent;
import com.example.market_app.repository.MarketListingRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class MarketListingProjection {

    private final MarketListingRepository marketListingRepository;

    @EventHandler
    @Transactional
    public void on(ItemPlacedEvent event) {
        MarketListingView listing = new MarketListingView();
        listing.setListingId(event.getListingId());
        listing.setItemName(event.getItemName());
        listing.setQuantity(event.getQuantity());
        listing.setPrice(event.getPrice());
        listing.setSellerId(event.getSellerId());
        listing.setStatus("ACTIVE");
        listing.setCreatedAt(event.getTimestamp());
        listing.setUpdatedAt(event.getTimestamp());
        marketListingRepository.save(listing);
    }

    @EventHandler
    @Transactional
    public void on(ItemSoldEvent event) {
        marketListingRepository.findById(event.getListingId()).ifPresent(listing -> {
            listing.setStatus("SOLD");
            listing.setUpdatedAt(event.getTimestamp());
            marketListingRepository.save(listing);
        });
    }
}