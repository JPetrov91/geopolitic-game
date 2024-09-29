// src/main/java/com/example/backend/dto/FactionDTO.java

package com.example.backend.dto;

import java.time.LocalDateTime;
import java.util.Set;

public class FactionDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Set<Long> memberIds; // Идентификаторы персонажей в фракции

    // Конструкторы
    public FactionDTO() {
    }

    public FactionDTO(Long id, String name, String description, LocalDateTime createdAt, LocalDateTime updatedAt, Set<Long> memberIds) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.memberIds = memberIds;
    }

    // Геттеры и Сеттеры

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Set<Long> getMemberIds() {
        return memberIds;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setMemberIds(Set<Long> memberIds) {
        this.memberIds = memberIds;
    }
}
