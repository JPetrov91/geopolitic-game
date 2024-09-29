package com.example.backend.mappers;

import com.example.backend.dto.CharacterResponse;
import com.example.backend.dto.CreateCharacterRequest;
import com.example.backend.entity.Character;
import org.springframework.stereotype.Component;

@Component
public class CharacterConverter {

    public Character mapToCharacter(CreateCharacterRequest request) {
        Character character = new Character();
        character.setNickname(request.getNickname());
        character.setAvatar(request.getAvatar());
        character.setEnergy(100);
        character.setStrength(0);
        character.setKnowledge(0);
        character.setEndurance(0);
        return character;
    }

    public CharacterResponse mapToResponse(Character character) {
        return new CharacterResponse(
                character.getId(),
                character.getNickname(),
                character.getAvatar(),
                character.getEnergy(),
                character.getStrength(),
                character.getKnowledge(),
                character.getEndurance(),
                character.getCurrentRegion().getId(),
                character.getCurrentRegion().getName(),
                character.getCurrentFaction() != null ? character.getCurrentFaction().getId() : null
        );
    }
}
