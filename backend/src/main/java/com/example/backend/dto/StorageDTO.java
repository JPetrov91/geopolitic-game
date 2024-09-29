package com.example.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

public class StorageDTO {

    @NotNull(message = "Количество руды обязательно")
    @Min(value = 0, message = "Количество руды не может быть отрицательным")
    private Integer oreAmount;

    @NotNull(message = "Количество нефти обязательно")
    @Min(value = 0, message = "Количество нефти не может быть отрицательным")
    private Integer oilAmount;

    @NotNull(message = "Количество дерева обязательно")
    @Min(value = 0, message = "Количество дерева не может быть отрицательным")
    private Integer woodAmount;

    private Long characterId;

    // Конструкторы
    public StorageDTO() {
    }

    public StorageDTO(Integer oreAmount, Integer oilAmount, Integer woodAmount, Long characterId) {
        this.oreAmount = oreAmount;
        this.oilAmount = oilAmount;
        this.woodAmount = woodAmount;
        this.characterId = characterId;
    }

    public Integer getOreAmount() {
        return oreAmount;
    }

    public void setOreAmount(Integer oreAmount) {
        this.oreAmount = oreAmount;
    }

    public Integer getOilAmount() {
        return oilAmount;
    }

    public void setOilAmount(Integer oilAmount) {
        this.oilAmount = oilAmount;
    }

    public Integer getWoodAmount() {
        return woodAmount;
    }

    public void setWoodAmount(Integer woodAmount) {
        this.woodAmount = woodAmount;
    }

    public Long getCharacterId() {
        return characterId;
    }

    public void setCharacterId(Long characterId) {
        this.characterId = characterId;
    }
}