package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateCharacterRequest {

    @NotBlank(message = "Никнейм не может быть пустым")
    private String nickname;

    private String avatar;

    @NotNull(message = "Энергия обязательна")
    private Integer energy;

    @NotNull(message = "Сила обязательна")
    private Integer strength;

    @NotNull(message = "Знания обязательны")
    private Integer knowledge;

    @NotNull(message = "Выносливость обязательна")
    private Integer endurance;

}
