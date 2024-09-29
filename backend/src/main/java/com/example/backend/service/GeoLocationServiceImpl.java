package com.example.backend.service;

import com.example.backend.entity.Character;
import com.example.backend.entity.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GeoLocationServiceImpl implements GeoLocationService {

    @Autowired
    private CharacterService characterService;

    @Autowired
    private RegionService regionService;

    @Override
    public Character moveCharacter(Long characterId, Long newRegionId) {
        Region region = regionService.findRegionById(newRegionId);
        Character character = characterService.getCharacterById(Math.toIntExact(characterId));
        character.setCurrentRegion(region);
        return characterService.updateCharacter(character);
    }
}
