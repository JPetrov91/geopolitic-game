package com.example.backend.dto;

import com.example.backend.entity.User;
import lombok.Data;

@Data
public class UserLoginResponse {

    private User user;

    private String token;

    private String message;

    public UserLoginResponse(User user, String token, String message) {
        this.user = user;
        this.token = token;
        this.message = message;
    }
}
