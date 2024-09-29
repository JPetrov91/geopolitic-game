package com.example.backend.service.user;

import com.example.backend.entity.User;
import com.example.backend.model.auth.RegistrationStatus;

import java.util.concurrent.CompletableFuture;

public interface UserAuthService {
    /**
     * Асинхронно регистрирует нового пользователя.
     *
     * @param user объект пользователя с данными для регистрации
     * @return CompletableFuture с результатом регистрации
     */
    CompletableFuture<RegistrationStatus> registerUser(User user);

    /**
     * Асинхронно аутентифицирует пользователя.
     *
     * @param user объект пользователя с данными для аутентификации
     * @return CompletableFuture с результатом аутентификации
     */
    CompletableFuture<String> authUser(User user);
}
