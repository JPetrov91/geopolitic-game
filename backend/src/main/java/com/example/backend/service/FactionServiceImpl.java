package com.example.backend.service;

import com.example.backend.entity.Character;
import com.example.backend.entity.Faction;
import com.example.backend.repository.CharacterRepository;
import com.example.backend.repository.FactionRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class FactionServiceImpl implements FactionService {

    private static final Logger logger = LoggerFactory.getLogger(FactionServiceImpl.class);

    private final FactionRepository factionRepository;
    private final CharacterRepository characterRepository;

    @Autowired
    public FactionServiceImpl(FactionRepository factionRepository, CharacterRepository characterRepository) {
        this.factionRepository = factionRepository;
        this.characterRepository = characterRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Faction> getAllFactions() {
        logger.debug("Получение списка всех фракций из репозитория");
        try {
            List<Faction> factions = factionRepository.findAll();
            logger.debug("Найдено {} фракций", factions.size());
            return factions;
        } catch (Exception e) {
            logger.error("Ошибка при получении списка фракций", e);
            throw e; // Перебрасываем исключение для обработки контроллером
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Faction getCharacterCurrentFaction(Long characterId) {
        logger.debug("Получение текущей фракции для персонажа с ID {}", characterId);

        try {
            Integer characterIdAsInt = Math.toIntExact(characterId);
            Optional<Character> characterOpt = characterRepository.findById(characterIdAsInt);

            if (characterOpt.isPresent()) {
                Character character = characterOpt.get();
                Faction faction = character.getCurrentFaction();
                if (faction != null) {
                    logger.debug("Персонаж с ID {} состоит во фракции '{}'", characterId, faction.getName());
                } else {
                    logger.debug("Персонаж с ID {} не состоит во фракции", characterId);
                }
                return faction;
            } else {
                logger.warn("Персонаж с ID {} не найден", characterId);
                return null;
            }
        } catch (Exception e) {
            logger.error("Ошибка при получении текущей фракции для персонажа с ID {}", characterId, e);
            throw e;
        }
    }

    @Override
    @Transactional
    public Faction createFaction(Long characterId, @Valid Faction faction) {
        logger.debug("Создание новой фракции: {} для персонажа с ID {}", faction.getName(), characterId);

        try {
            Integer characterIdAsInt = Math.toIntExact(characterId);
            Optional<Character> characterOpt = characterRepository.findById(characterIdAsInt);

            if (characterOpt.isEmpty()) {
                logger.warn("Персонаж с ID {} не найден при создании фракции", characterId);
                throw new IllegalArgumentException("Персонаж не найден");
            }

            Character character = characterOpt.get();

            if (character.getCurrentFaction() != null) {
                logger.warn("Персонаж с ID {} уже принадлежит фракции '{}'", characterId, character.getCurrentFaction().getName());
                throw new IllegalStateException("Персонаж уже принадлежит фракции");
            }

            // Сохраняем новую фракцию
            Faction savedFaction = factionRepository.save(faction);
            logger.debug("Фракция '{}' сохранена с ID {}", savedFaction.getName(), savedFaction.getId());

            // Назначаем фракцию персонажу
            character.setCurrentFaction(savedFaction);
            characterRepository.save(character);
            logger.debug("Фракция '{}' назначена персонажу с ID {}", savedFaction.getName(), characterId);

            logger.info("Фракция '{}' успешно создана и назначена персонажу с ID {}", savedFaction.getName(), characterId);
            return savedFaction;
        } catch (Exception e) {
            logger.error("Ошибка при создании фракции для персонажа с ID {}", characterId, e);
            throw e;
        }
    }

    @Override
    @Transactional
    public Faction addCharacterToFaction(Long characterId, Long factionId) {
        logger.debug("Добавление персонажа с ID {} во фракцию с ID {}", characterId, factionId);

        try {
            Integer characterIdAsInt = Math.toIntExact(characterId);
            Optional<Character> characterOpt = characterRepository.findById(characterIdAsInt);
            Optional<Faction> factionOpt = factionRepository.findById(factionId);

            if (characterOpt.isEmpty()) {
                logger.warn("Персонаж с ID {} не найден при добавлении во фракцию", characterId);
                throw new IllegalArgumentException("Персонаж не найден");
            }

            if (factionOpt.isEmpty()) {
                logger.warn("Фракция с ID {} не найдена при добавлении персонажа с ID {}", factionId, characterId);
                throw new IllegalArgumentException("Фракция не найдена");
            }

            Character character = characterOpt.get();
            Faction faction = factionOpt.get();

            if (character.getCurrentFaction() != null) {
                logger.warn("Персонаж с ID {} уже принадлежит фракции '{}'", characterId, character.getCurrentFaction().getName());
                throw new IllegalStateException("Персонаж уже принадлежит фракции");
            }

            // Назначаем фракцию персонажу
            character.setCurrentFaction(faction);
            characterRepository.save(character);
            logger.debug("Фракция '{}' назначена персонажу с ID {}", faction.getName(), characterId);

            logger.info("Персонаж с ID {} успешно добавлен во фракцию '{}'", characterId, faction.getName());
            return faction;
        } catch (Exception e) {
            logger.error("Ошибка при добавлении персонажа с ID {} во фракцию с ID {}", characterId, factionId, e);
            throw e;
        }
    }

    @Override
    @Transactional
    public void removeCharacterFromFaction(Long characterId) {
        logger.debug("Удаление персонажа с ID {} из фракции", characterId);

        try {
            Integer characterIdAsInt = Math.toIntExact(characterId);
            Optional<Character> characterOpt = characterRepository.findById(characterIdAsInt);

            if (characterOpt.isEmpty()) {
                logger.warn("Персонаж с ID {} не найден при удалении из фракции", characterId);
                throw new IllegalArgumentException("Персонаж не найден");
            }

            Character character = characterOpt.get();

            if (character.getCurrentFaction() == null) {
                logger.warn("Персонаж с ID {} не принадлежит ни одной фракции", characterId);
                throw new IllegalStateException("Персонаж не принадлежит ни одной фракции");
            }

            String factionName = character.getCurrentFaction().getName();
            // Удаляем фракцию персонажу
            character.setCurrentFaction(null);
            characterRepository.save(character);
            logger.debug("Персонаж с ID {} удалён из фракции '{}'", characterId, factionName);

            logger.info("Персонаж с ID {} успешно удалён из фракции '{}'", characterId, factionName);
        } catch (Exception e) {
            logger.error("Ошибка при удалении персонажа с ID {} из фракции", characterId, e);
            throw e;
        }
    }
}
