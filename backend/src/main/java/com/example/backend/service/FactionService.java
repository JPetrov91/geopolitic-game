package com.example.backend.service;

import com.example.backend.entity.Faction;
import jakarta.validation.Valid;

import java.util.List;

public interface FactionService {
    List<Faction> getAllFactions();
    Faction getCharacterCurrentFaction(Long characterId);
    Faction createFaction(Long characterId, @Valid Faction faction);
    Faction addCharacterToFaction(Long characterId, Long factionId);
    void removeCharacterFromFaction(Long characterId);
}

