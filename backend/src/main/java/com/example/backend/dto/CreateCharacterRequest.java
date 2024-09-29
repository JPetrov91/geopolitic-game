package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateCharacterRequest {

    @NotBlank(message = "Никнейм не может быть пустым")
    private String nickname;

    private String avatar;
}