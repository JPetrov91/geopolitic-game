package com.example.backend.service;

import com.example.backend.entity.Character;
import com.example.backend.entity.Region;
import com.example.backend.entity.Storage;
import com.example.backend.entity.User;
import com.example.backend.repository.CharacterRepository;
import com.example.backend.repository.StorageRepository;
import com.example.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class CharacterServiceImpl implements CharacterService {

    private final CharacterRepository characterRepository;
    private final UserRepository userRepository;

    private final RegionService regionService;

    private final StorageRepository storageRepository;

    @Autowired
    public CharacterServiceImpl(CharacterRepository characterRepository,
                                UserRepository userRepository,
                                RegionService regionService,
                                StorageRepository storageRepository) {

        this.characterRepository = characterRepository;
        this.userRepository = userRepository;
        this.regionService = regionService;
        this.storageRepository = storageRepository;
    }

    /**
     * Загружает персонажа по имени пользователя.
     *
     * @param username имя пользователя
     * @return CompletableFuture с персонажем или пустым
     */
    @Transactional(readOnly = true)
    public Character loadCharacterForUser(String username) {
        return characterRepository.findByUserUsername(username)
                .orElse(null);
    }

    /**
     * Получает персонажа по его ID.
     *
     * @param characterId ID персонажа
     * @return CompletableFuture с персонажем или пустым
     */
    @Transactional(readOnly = true)
    public Character getCharacterById(Integer characterId) {
        return characterRepository.findById(characterId).orElse(null);
    }

    /**
     * Создает нового персонажа для пользователя.
     *
     * @param username имя пользователя
     * @param character объект персонажа
     * @return CompletableFuture с созданным персонажем
     */
    @Transactional
    public Character createCharacter(String username, Character character) {
        log.info("Создание персонажа для пользователя: {}", username);
        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (user.getCharacter() != null) {
            throw new IllegalArgumentException("User already have character");
        }

        //init default values
        character.setEnergy(100);
        character.setStrength(0);
        character.setKnowledge(0);
        character.setEndurance(0);

        Region region = regionService.getRandomRegion();
        character.setUser(user);
        character.setCurrentRegion(region);

        Character savedCharacter = characterRepository.save(character);

        // Создание склада для персонажа
        Storage storage = new Storage(0, 0, 0, character);
        character.setStorage(storage); // Устанавливаем двустороннюю связь
        storageRepository.save(storage);
        log.info("Склад успешно создан для персонажа с ID: {}", savedCharacter.getId());


        return savedCharacter;
    }

    /**
     * Обновляет существующего персонажа.
     *
     * @param character объект персонажа
     * @return CompletableFuture с обновленным персонажем
     */
    @Transactional
    public Character updateCharacter(Character character) {
        if (character == null) {
            throw new IllegalArgumentException("Character is null");
        }
        if (character.getId() == null) {
            throw new IllegalArgumentException("Character is null");
        }
        Character existingCharacter = getCharacterById(Math.toIntExact(character.getId()));
        if (existingCharacter == null) {
            throw new IllegalArgumentException("Character not found");
        }

        existingCharacter.setNickname(character.getNickname());
        existingCharacter.setAvatar(character.getAvatar());
        existingCharacter.setEnergy(character.getEnergy());
        existingCharacter.setStrength(character.getStrength());
        existingCharacter.setKnowledge(character.getKnowledge());
        existingCharacter.setEndurance(character.getEndurance());

        return characterRepository.save(existingCharacter);
    }
}
