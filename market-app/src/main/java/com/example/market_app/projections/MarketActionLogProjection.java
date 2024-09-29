package com.example.market_app.projections;

import com.example.market_app.entity.MarketActionLogView;
import com.example.market_app.events.ItemPlacedEvent;
import com.example.market_app.events.ItemSoldEvent;
import com.example.market_app.repository.MarketActionLogRepository;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class MarketActionLogProjection {

    private final MarketActionLogRepository marketActionLogRepository;

    @EventHandler
    @Transactional
    public void on(ItemPlacedEvent event) {
        MarketActionLogView log = new MarketActionLogView();
        log.setId(UUID.randomUUID().toString());
        log.setListingId(event.getListingId());
        log.setActionType("ITEM_PLACED");
        log.setActorId(event.getSellerId());
        log.setTimestamp(event.getTimestamp());
        marketActionLogRepository.save(log);
    }

    @EventHandler
    @Transactional
    public void on(ItemSoldEvent event) {
        MarketActionLogView log = new MarketActionLogView();
        log.setId(UUID.randomUUID().toString());
        log.setListingId(event.getListingId());
        log.setActionType("ITEM_SOLD");
        log.setActorId(event.getBuyerId());
        log.setTimestamp(event.getTimestamp());
        marketActionLogRepository.save(log);
    }
}