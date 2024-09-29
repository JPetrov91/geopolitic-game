package com.example.backend.controller;

import com.example.backend.dto.CharacterDTO;
import com.example.backend.dto.CreateCharacterRequest;
import com.example.backend.dto.UpdateCharacterRequest;
import com.example.backend.entity.Character;
import com.example.backend.mapper.CharacterMapper;
import com.example.backend.service.CharacterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {

    private final CharacterService characterService;

    private final CharacterMapper characterMapper;

    @Autowired
    public CharacterController(CharacterService characterService, CharacterMapper characterMapper) {
        this.characterService = characterService;
        this.characterMapper = characterMapper;
    }

    /**
     * Загружает персонажа для пользователя по имени.
     *
     * @param username имя пользователя
     * @return ResponseEntity с персонажем или статусом NOT_FOUND
     */
    @GetMapping("/user/{username}")
    public ResponseEntity<CharacterDTO> loadCharacterForUser(@PathVariable String username) {
        Character character = characterService.loadCharacterForUser(username);
        return character != null ?
                ResponseEntity.ok().body(characterMapper.toDTO(character)) :
                ResponseEntity.notFound().build();
    }

    /**
     * Получает персонажа по его ID.
     *
     * @param characterId ID персонажа
     * @return ResponseEntity с персонажем или статусом NOT_FOUND
     */
    @GetMapping("/{characterId}")
    public ResponseEntity<CharacterDTO> getCharacterById(@PathVariable Integer characterId) {
        Character character = characterService.getCharacterById(characterId);
        return ResponseEntity.ok().body(characterMapper.toDTO(character));
    }

    /**
     * Создает нового персонажа для пользователя.
     *
     * @param username имя пользователя
     * @param request объект запроса на создание персонажа
     * @return ResponseEntity с созданным персонажем или статусом BAD_REQUEST
     */
    @PostMapping("/user/{username}")
    public ResponseEntity<CharacterDTO> createCharacter(@PathVariable String username,
                                                        @Valid @RequestBody CharacterDTO request) {

        Character character = characterMapper.toEntity(request);
        Character createdCharacter = characterService.createCharacter(username, character);
        return ResponseEntity.ok().body(characterMapper.toDTO(createdCharacter));

    }

    /**
     * Обновляет существующего персонажа.
     *
     * @param request объект запроса на обновление персонажа
     * @return ResponseEntity с обновленным персонажем или статусом BAD_REQUEST
     */
    @PutMapping("/{characterId}")
    public ResponseEntity<CharacterDTO> updateCharacter(@Valid @RequestBody UpdateCharacterRequest request) {

        Character character = new Character();
        character.setNickname(request.getNickname());
        character.setAvatar(request.getAvatar());
        character.setEnergy(request.getEnergy());
        character.setStrength(request.getStrength());
        character.setKnowledge(request.getKnowledge());
        character.setEndurance(request.getEndurance());

        Character updatedCharacter = characterService.updateCharacter(character);
        return ResponseEntity.ok().body(characterMapper.toDTO(updatedCharacter));
    }
}