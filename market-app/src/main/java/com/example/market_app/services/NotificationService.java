package com.example.market_app.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    // Реализуйте логику отправки уведомлений (например, через Email, SMS, Push Notifications)

    public void sendNotification(String sellerId, String message) {
        // Пример: Отправка сообщения в консоль
        System.out.println("Уведомление для продавца " + sellerId + ": " + message);
    }
}
