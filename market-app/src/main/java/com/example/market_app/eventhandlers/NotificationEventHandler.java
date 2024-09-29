package com.example.market_app.eventhandlers;

import com.example.market_app.events.ItemSoldNotificationEvent;
import com.example.market_app.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventHandler {

    private final NotificationService notificationService;

    @EventHandler
    public void on(ItemSoldNotificationEvent event) {
        // Вызов сервиса уведомлений для отправки уведомления продавцу
        notificationService.sendNotification(event.getSellerId(), "Ваш товар \"" + event.getItemName() + "\" был продан покупателем " + event.getBuyerId() + " за " + event.getTotalPrice() + " ₽.");
    }
}
