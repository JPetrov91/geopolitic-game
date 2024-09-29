package com.example.market_app.aggregates;

import com.example.market_app.commands.BuyItemCommand;
import com.example.market_app.commands.PlaceItemCommand;
import com.example.market_app.events.ItemPlacedEvent;
import com.example.market_app.events.ItemSoldEvent;
import com.example.market_app.events.ItemSoldNotificationEvent;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventhandling.gateway.EventGateway;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.spring.stereotype.Aggregate;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;

import static org.axonframework.modelling.command.AggregateLifecycle.apply;

@Aggregate
@NoArgsConstructor
public class MarketListingAggregate {

    @AggregateIdentifier
    private String listingId;
    private String itemName;
    private Integer quantity;
    private BigDecimal price;
    private String sellerId;
    private ListingStatus status;

    @Autowired
    private transient EventGateway eventGateway;

    @CommandHandler
    public MarketListingAggregate(PlaceItemCommand command) {
        // Валидация команды
        if (command.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero.");
        }
        if (command.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Price must be greater than zero.");
        }

        // Генерация события
        apply(new ItemPlacedEvent(
                command.getListingId(),
                command.getItemName(),
                command.getQuantity(),
                command.getPrice(),
                command.getSellerId(),
                System.currentTimeMillis()
        ));
    }

    @EventSourcingHandler
    public void on(ItemPlacedEvent event) {
        this.listingId = event.getListingId();
        this.itemName = event.getItemName();
        this.quantity = event.getQuantity();
        this.price = event.getPrice();
        this.sellerId = event.getSellerId();
        this.status = ListingStatus.ACTIVE;
    }

    @CommandHandler
    public void handle(BuyItemCommand command) {
        if (!this.status.equals(ListingStatus.ACTIVE)) {
            throw new IllegalStateException("Listing is not active.");
        }

        // Генерация события продажи
        apply(new ItemSoldEvent(
                this.listingId,
                command.getBuyerId(),
                this.quantity,
                this.price.multiply(BigDecimal.valueOf(this.quantity)),
                System.currentTimeMillis()
        ));

        eventGateway.publish(new ItemSoldNotificationEvent(
                this.sellerId,
                this.itemName,
                command.getBuyerId(),
                this.quantity,
                this.price.multiply(BigDecimal.valueOf(this.quantity)),
                System.currentTimeMillis()
        ));
    }

    @EventSourcingHandler
    public void on(ItemSoldEvent event) {
        this.status = ListingStatus.SOLD;
    }

    // Дополнительные методы и логика
}
