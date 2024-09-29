package com.example.backend.model.auth;

import lombok.Data;

@Data
public class RegistrationStatus {

    public RegistrationStatus(boolean isRegistered, String message) {
        this.isRegistered = isRegistered;
        this.message = message;
    }

    private boolean isRegistered;

    private String message;
}
