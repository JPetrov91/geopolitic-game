package com.example.backend.dto;

public class CharacterDTO {

    private Long id;
    private String nickname;
    private String avatar;
    private Integer energy;
    private Integer strength;
    private Integer knowledge;
    private Integer endurance;
    private Long storageId;
    private Long currentRegionId;
    private String currentRegionName;
    private Long currentFactionId;

    public CharacterDTO() {
    }

    public CharacterDTO(Long id, String nickname, String avatar, Integer energy, Integer strength, Integer knowledge,
                        Integer endurance, Long storageId, Long currentRegionId, String currentRegionName,
                        Long currentFactionId) {

        this.id = id;
        this.nickname = nickname;
        this.avatar = avatar;
        this.energy = energy;
        this.strength = strength;
        this.knowledge = knowledge;
        this.endurance = endurance;
        this.storageId = storageId;
        this.currentRegionId = currentRegionId;
        this.currentRegionName = currentRegionName;
        this.currentFactionId = currentFactionId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getEnergy() {
        return energy;
    }

    public void setEnergy(Integer energy) {
        this.energy = energy;
    }

    public Integer getStrength() {
        return strength;
    }

    public void setStrength(Integer strength) {
        this.strength = strength;
    }

    public Integer getKnowledge() {
        return knowledge;
    }

    public void setKnowledge(Integer knowledge) {
        this.knowledge = knowledge;
    }

    public Integer getEndurance() {
        return endurance;
    }

    public void setEndurance(Integer endurance) {
        this.endurance = endurance;
    }

    public Long getStorageId() {
        return storageId;
    }

    public void setStorageId(Long storageId) {
        this.storageId = storageId;
    }

    public Long getCurrentRegionId() {
        return currentRegionId;
    }

    public void setCurrentRegionId(Long currentRegionId) {
        this.currentRegionId = currentRegionId;
    }

    public String getCurrentRegionName() {
        return currentRegionName;
    }

    public void setCurrentRegionName(String currentRegionName) {
        this.currentRegionName = currentRegionName;
    }

    public Long getCurrentFactionId() {
        return currentFactionId;
    }

    public void setCurrentFactionId(Long currentFactionId) {
        this.currentFactionId = currentFactionId;
    }
}
