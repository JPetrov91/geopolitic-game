package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "characters")
@Data
@NoArgsConstructor
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column
    private String avatar;

    @Column(nullable = false)
    private Integer energy;

    @Column(nullable = false)
    private Integer strength;

    @Column(nullable = false)
    private Integer knowledge;

    @Column(nullable = false)
    private Integer endurance;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @EqualsAndHashCode.Exclude
    private User user;

    @OneToOne(mappedBy = "character", cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @EqualsAndHashCode.Exclude
    private Storage storage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    @EqualsAndHashCode.Exclude
    private Region currentRegion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faction_id")
    @JsonBackReference
    @EqualsAndHashCode.Exclude
    private Faction currentFaction;

    public Character(String nickname, String avatar, Integer energy, Integer strength, Integer knowledge,
                     Integer endurance, User user, Region currentRegion) {
        this.nickname = nickname;
        this.avatar = avatar;
        this.energy = energy;
        this.strength = strength;
        this.knowledge = knowledge;
        this.endurance = endurance;
        this.user = user;
        this.currentRegion = currentRegion;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public Region getCurrentRegion() {
        return currentRegion;
    }

    public void setCurrentRegion(Region currentRegion) {
        this.currentRegion = currentRegion;
    }

    public Faction getCurrentFaction() {
        return currentFaction;
    }

    public void setCurrentFaction(Faction currentFaction) {
        this.currentFaction = currentFaction;
    }
}