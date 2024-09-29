package com.example.backend.service;

import com.example.backend.entity.Character;

import java.util.concurrent.CompletableFuture;

public interface GeoLocationService {

    Character moveCharacter(Long characterId, Long newRegionId);
}
