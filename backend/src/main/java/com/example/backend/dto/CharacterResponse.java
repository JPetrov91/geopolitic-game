package com.example.backend.dto;

import lombok.Data;

@Data
public class CharacterResponse {
    private Long id;
    private String nickname;
    private String avatar;
    private Integer energy;
    private Integer strength;
    private Integer knowledge;
    private Integer endurance;
    private Long currentRegionId;
    private String currentRegionName;
    private Long currentFactionId;

    // Конструкторы, геттеры и сеттеры

    public CharacterResponse() {}

    public CharacterResponse(Long id, String nickname, String avatar, Integer energy, Integer strength,
                             Integer knowledge, Integer endurance, Long currentRegionId, String currentRegionName,
                             Long currentFactionId) {
        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
        this.energy = energy;
        this.strength = strength;
        this.knowledge = knowledge;
        this.endurance = endurance;
        this.currentRegionId = currentRegionId;
        this.currentRegionName = currentRegionName;
        this.currentFactionId = currentFactionId;
    }

    // Геттеры и сеттеры
    // ...
}
