package com.example.backend.service;

import com.example.backend.dto.StorageDTO;
import com.example.backend.entity.Character;
import com.example.backend.entity.Storage;
import com.example.backend.repository.StorageRepository;
import io.swagger.v3.oas.models.security.SecurityScheme;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StorageServiceImpl implements StorageService {

    private final StorageRepository storageRepository;
    private final CharacterService characterService; // Предполагается, что есть CharacterService для доступа к Character

    @Autowired
    public StorageServiceImpl(StorageRepository storageRepository, CharacterService characterService) {
        this.storageRepository = storageRepository;
        this.characterService = characterService;
    }

    @Override
    @Transactional
    public Storage createStorage(Long characterId) throws Exception {
        // Проверка, существует ли персонаж
        Integer characterIdAsInt = Math.toIntExact(characterId);
        Character character = characterService.getCharacterById(characterIdAsInt);

        // Проверка, есть ли уже склад у персонажа
        if (storageRepository.findByCharacterId(characterId).isPresent()) {
            throw new Exception("У персонажа уже есть склад");
        }

        // Создание нового склада с начальными значениями ресурсов (например, 0)
        Storage storage = new Storage(0, 0, 0, character);
        character.setStorage(storage); // Устанавливаем двустороннюю связь

        return storageRepository.save(storage);
    }

    @Override
    @Transactional
    public Storage updateStorage(Long storageId, StorageDTO storageDTO) throws Exception {
        // Поиск склада по ID
        Storage storage = storageRepository.findById(storageId)
                .orElseThrow(() -> new EntityNotFoundException("Склад не найден с ID: " + storageId));

        // Обновление полей
        storage.setOreAmount(storageDTO.getOreAmount());
        storage.setOilAmount(storageDTO.getOilAmount());
        storage.setWoodAmount(storageDTO.getWoodAmount());

        return storageRepository.save(storage);
    }

    @Override
    @Transactional(readOnly = true)
    public Storage getStorageById(Long storageId) throws Exception {
        return storageRepository.findById(storageId)
                .orElseThrow(() -> new EntityNotFoundException("Склад не найден с ID: " + storageId));
    }

    @Override
    public Storage addResource(Long storageId, String resourceType, Integer resourceAmount) throws Exception {
        Storage storage = storageRepository.findById(storageId)
                .orElseThrow(() -> new EntityNotFoundException("Склад не найден с ID: " + storageId));
        switch (resourceType) {
            case "oil":
                Integer oilAmount = storage.getOilAmount();
                oilAmount = oilAmount + resourceAmount;
                storage.setOilAmount(oilAmount);
                break;
            case "ore":
                Integer oreAmount = storage.getOreAmount();
                oreAmount = oreAmount + resourceAmount;
                storage.setOreAmount(oreAmount);
                break;
            case "wood":
                Integer woodAmount = storage.getWoodAmount();
                woodAmount = woodAmount + resourceAmount;
                storage.setWoodAmount(woodAmount);
                break;
            default:
                break;
        }

        return storageRepository.save(storage);
    }
}