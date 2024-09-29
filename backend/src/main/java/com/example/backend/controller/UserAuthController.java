package com.example.backend.controller;

import com.example.backend.dto.UserLoginResponse;
import com.example.backend.entity.User;
import com.example.backend.service.user.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/auth")
public class UserAuthController {

    private final UserAuthService userAuthService;

    @Autowired
    public UserAuthController(UserAuthService userAuthService) {
        this.userAuthService = userAuthService;
    }

    /**
     * Эндпоинт для асинхронной регистрации пользователя.
     *
     * @param user объект пользователя
     * @return CompletableFuture с ответом регистрации
     */
    @PostMapping("/register")
    public CompletableFuture<ResponseEntity<String>> register(@RequestBody User user) {
        return userAuthService.registerUser(user)
                .thenApply(status -> {
                    if (status.isRegistered()) {
                        return ResponseEntity.status(HttpStatus.CREATED).body(status.getMessage());
                    } else {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(status.getMessage());
                    }
                });
    }

    /**
     * Эндпоинт для асинхронной аутентификации пользователя.
     *
     * @param user объект пользователя
     * @return CompletableFuture с ответом аутентификации
     */
    @PostMapping("/login")
    public CompletableFuture<ResponseEntity<UserLoginResponse>> login(@RequestBody User user) {
        return userAuthService.authUser(user)
                .thenApply(token -> {
                    if (token != null) {
                        return ResponseEntity.ok(new UserLoginResponse(user, token, null));
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(new UserLoginResponse(null, null, "Incorrect username or/and password"));
                    }
                });
    }
}