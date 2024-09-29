package com.example.backend.controller;

import com.example.backend.dto.CreateFactionDTO;
import com.example.backend.dto.FactionDTO;
import com.example.backend.entity.Faction;
import com.example.backend.mapper.FactionMapper;
import com.example.backend.service.FactionService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/factions")
public class FactionController {

    private static final Logger logger = LoggerFactory.getLogger(FactionController.class);

    @Autowired
    private FactionService factionService;

    @Autowired
    private FactionMapper factionMapper;

    /**
     * Получение всех фракций
     * GET /api/factions
     */
    @GetMapping
    public ResponseEntity<List<FactionDTO>> getAllFactions() {
        logger.debug("Получение списка всех фракций");

        try {
            List<Faction> factions = factionService.getAllFactions();
            logger.debug("Найдено {} фракций", factions.size());

            List<FactionDTO> factionDTOs = factions.stream()
                    .map(factionMapper::toDTO)
                    .collect(Collectors.toList());
            logger.info("Возвращено {} фракций клиенту", factionDTOs.size());

            return ResponseEntity.ok(factionDTOs);
        } catch (Exception e) {
            logger.error("Ошибка при получении списка фракций", e);
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Получение текущей фракции персонажа
     * GET /api/factions/character/{characterId}
     */
    @GetMapping("/character/{characterId}")
    public ResponseEntity<FactionDTO> getCharacterCurrentFaction(@PathVariable Long characterId) {
        logger.debug("Получение текущей фракции для персонажа с ID {}", characterId);

        try {
            Faction faction = factionService.getCharacterCurrentFaction(characterId);
            if (faction != null) {
                FactionDTO factionDTO = factionMapper.toDTO(faction);
                logger.info("Персонаж с ID {} состоит во фракции {}", characterId, faction.getName());
                return ResponseEntity.ok(factionDTO);
            } else {
                logger.warn("Персонаж с ID {} не состоит во фракции", characterId);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Ошибка при получении текущей фракции для персонажа с ID {}", characterId, e);
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Создание новой фракции и назначение её персонажу
     * POST /api/factions/character/{characterId}
     */
    @PostMapping("/character/{characterId}")
    public ResponseEntity<FactionDTO> createFaction(
            @PathVariable Long characterId,
            @Valid @RequestBody CreateFactionDTO createFactionDTO) {
        logger.debug("Создание новой фракции для персонажа с ID {}: {}", characterId, createFactionDTO);

        try {
            Faction factionEntity = factionMapper.toEntity(createFactionDTO);
            Faction faction = factionService.createFaction(characterId, factionEntity);
            FactionDTO factionDTO = factionMapper.toDTO(faction);
            logger.info("Фракция '{}' успешно создана и назначена персонажу с ID {}", faction.getName(), characterId);
            return ResponseEntity.ok(factionDTO);
        } catch (IllegalArgumentException e) {
            logger.warn("Неверные аргументы при создании фракции для персонажа с ID {}: {}", characterId, e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (IllegalStateException e) {
            logger.warn("Конфликт при создании фракции для персонажа с ID {}: {}", characterId, e.getMessage());
            return ResponseEntity.status(409).body(null); // Conflict
        } catch (Exception e) {
            logger.error("Неизвестная ошибка при создании фракции для персонажа с ID {}", characterId, e);
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Добавление персонажа во фракцию
     * POST /api/factions/character/{characterId}/add?factionId={factionId}
     */
    @PostMapping("/character/{characterId}/add")
    public ResponseEntity<FactionDTO> addCharacterToFaction(
            @PathVariable Long characterId,
            @RequestParam Long factionId) {
        logger.debug("Добавление персонажа с ID {} во фракцию с ID {}", characterId, factionId);

        try {
            Faction faction = factionService.addCharacterToFaction(characterId, factionId);
            FactionDTO factionDTO = factionMapper.toDTO(faction);
            logger.info("Персонаж с ID {} успешно добавлен во фракцию '{}'", characterId, faction.getName());
            return ResponseEntity.ok(factionDTO);
        } catch (IllegalArgumentException e) {
            logger.warn("Неверные аргументы при добавлении персонажа с ID {} во фракцию с ID {}: {}", characterId, factionId, e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (IllegalStateException e) {
            logger.warn("Конфликт при добавлении персонажа с ID {} во фракцию с ID {}: {}", characterId, factionId, e.getMessage());
            return ResponseEntity.status(409).body(null); // Conflict
        } catch (Exception e) {
            logger.error("Неизвестная ошибка при добавлении персонажа с ID {} во фракцию с ID {}", characterId, factionId, e);
            return ResponseEntity.status(500).body(null);
        }
    }

    /**
     * Удаление персонажа из фракции
     * DELETE /api/factions/character/{characterId}/remove
     */
    @DeleteMapping("/character/{characterId}/remove")
    public ResponseEntity<Void> removeCharacterFromFaction(@PathVariable Long characterId) {
        logger.debug("Удаление персонажа с ID {} из фракции", characterId);

        try {
            factionService.removeCharacterFromFaction(characterId);
            logger.info("Персонаж с ID {} успешно удалён из фракции", characterId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            logger.warn("Неверные аргументы при удалении персонажа с ID {} из фракции: {}", characterId, e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (IllegalStateException e) {
            logger.warn("Конфликт при удалении персонажа с ID {} из фракции: {}", characterId, e.getMessage());
            return ResponseEntity.status(409).build(); // Conflict
        } catch (Exception e) {
            logger.error("Неизвестная ошибка при удалении персонажа с ID {} из фракции", characterId, e);
            return ResponseEntity.status(500).build();
        }
    }
}
