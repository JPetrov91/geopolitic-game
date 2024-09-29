package com.example.backend.service;

import com.example.backend.dto.StorageDTO;
import com.example.backend.entity.Storage;

public interface StorageService {
    Storage createStorage(Long characterId) throws Exception;

    Storage updateStorage(Long storageId, StorageDTO storageDTO) throws Exception;

    Storage getStorageById(Long storageId) throws Exception;

    Storage addResource(Long storageId, String resourceType, Integer resourceAmount) throws Exception;
}
