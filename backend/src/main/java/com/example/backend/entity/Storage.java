package com.example.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Entity
@Table(name = "storages")
@Data
public class Storage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 0, message = "Количество руды не может быть отрицательным")
    @Column(name = "ore_amount", nullable = false)
    private Integer oreAmount;

    @Min(value = 0, message = "Количество нефти не может быть отрицательным")
    @Column(name = "oil_amount", nullable = false)
    private Integer oilAmount;

    @Min(value = 0, message = "Количество дерева не может быть отрицательным")
    @Column(name = "wood_amount", nullable = false)
    private Integer woodAmount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id", nullable = false, unique = true)
    private Character character;

    // Конструкторы
    public Storage() {
    }

    public Storage(Integer oreAmount, Integer oilAmount, Integer woodAmount, Character character) {
        this.oreAmount = oreAmount;
        this.oilAmount = oilAmount;
        this.woodAmount = woodAmount;
        this.character = character;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Character getCharacter() {
        return character;
    }

    public void setCharacter(Character character) {
        this.character = character;
    }
}
