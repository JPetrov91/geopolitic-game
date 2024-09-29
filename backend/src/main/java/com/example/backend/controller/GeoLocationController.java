package com.example.backend.controller;

import com.example.backend.dto.CharacterResponse;
import com.example.backend.dto.UpdateCharacterRequest;
import com.example.backend.entity.Character;
import com.example.backend.mappers.CharacterConverter;
import com.example.backend.service.GeoLocationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/geolocation")
public class GeoLocationController {

    @Autowired
    private GeoLocationService geoLocationService;

    @Autowired
    private CharacterConverter characterConverter;


    @PutMapping("/{characterId}/{regionId}")
    public ResponseEntity<CharacterResponse> moveCharacter(@PathVariable Long characterId,
                                                           @PathVariable Long regionId) {


        Character movedCharacter = geoLocationService.moveCharacter(characterId, regionId);
        return ResponseEntity.ok().body(characterConverter.mapToResponse(movedCharacter));
    }
}
