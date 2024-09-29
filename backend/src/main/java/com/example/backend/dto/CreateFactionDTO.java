package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateFactionDTO {

    @NotBlank(message = "Название фракции не может быть пустым")
    @Size(max = 255, message = "Название фракции не может превышать 255 символов")
    private String name;

    @Size(max = 500, message = "Описание фракции не может превышать 500 символов")
    private String description;

    // Конструкторы
    public CreateFactionDTO() {
    }

    public CreateFactionDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Геттеры и Сеттеры

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
