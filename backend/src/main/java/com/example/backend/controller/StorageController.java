package com.example.backend.controller;

import com.example.backend.dto.ResourceRequestDTO;
import com.example.backend.dto.StorageDTO;
import com.example.backend.entity.Storage;
import com.example.backend.mapper.StorageMapper;
import com.example.backend.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/storages")
public class StorageController {

    private final StorageService storageService;

    private final StorageMapper storageMapper;

    @Autowired
    public StorageController(StorageService storageService, StorageMapper storageMapper) {
        this.storageService = storageService;
        this.storageMapper = storageMapper;
    }

    /**
     * Создание склада для персонажа
     *
     * @param characterId ID персонажа
     * @return Созданный склад
     */
    @PostMapping("/character/{characterId}")
    public ResponseEntity<StorageDTO> createStorage(@PathVariable Long characterId) {
        try {
            Storage storage = storageService.createStorage(characterId);
            StorageDTO storageDTO = storageMapper.toDTO(storage);
            return new ResponseEntity<>(storageDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            // Логирование ошибки
            // logger.error("Ошибка при создании склада: ", e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Обновление склада
     *
     * @param storageId   ID склада
     * @param storageDTO  Новые данные склада
     * @return Обновленный склад
     */
    @PutMapping("/{storageId}")
    public ResponseEntity<StorageDTO> updateStorage(@PathVariable Long storageId,
                                                 @Validated @RequestBody StorageDTO storageDTO) {
        try {
            Storage updatedStorage = storageService.updateStorage(storageId, storageDTO);
            StorageDTO updatedStorageDTO = storageMapper.toDTO(updatedStorage);
            return new ResponseEntity<>(updatedStorageDTO, HttpStatus.OK);
        } catch (Exception e) {
            // Логирование ошибки
            // logger.error("Ошибка при обновлении склада: ", e);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Получение склада по ID
     *
     * @param storageId ID склада
     * @return Склад
     */
    @GetMapping("/{storageId}")
    public ResponseEntity<StorageDTO> getStorageById(@PathVariable Long storageId) {
        try {
            Storage storage = storageService.getStorageById(storageId);
            StorageDTO storageDTO = storageMapper.toDTO(storage);
            return new ResponseEntity<>(storageDTO, HttpStatus.OK);
        } catch (Exception e) {
            // Логирование ошибки
            // logger.error("Ошибка при получении склада: ", e);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{storageId}/addResource")
    public ResponseEntity<StorageDTO> addResource(@PathVariable Long storageId,
                                                  @RequestBody ResourceRequestDTO resourceRequestDTO) {

        try {
            Storage updatedStorage = storageService.addResource(storageId, resourceRequestDTO.getResourceType(),
                    resourceRequestDTO.getAmount());
            StorageDTO storageDTO = storageMapper.toDTO(updatedStorage);
            return new ResponseEntity<>(storageDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
