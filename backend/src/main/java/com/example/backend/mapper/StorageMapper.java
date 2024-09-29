package com.example.backend.mapper;

import com.example.backend.dto.StorageDTO;
import com.example.backend.entity.Storage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StorageMapper {

    @Mapping(source = "character.id", target = "characterId")
    StorageDTO toDTO(Storage storage);
}
