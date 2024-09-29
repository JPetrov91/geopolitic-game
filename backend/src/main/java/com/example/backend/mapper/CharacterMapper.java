package com.example.backend.mapper;

import com.example.backend.dto.CharacterDTO;
import com.example.backend.entity.Character;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CharacterMapper {

    @Mapping(source = "storage.id", target = "storageId")
    @Mapping(source = "currentRegion.id", target = "currentRegionId")
    @Mapping(source = "currentRegion.name", target = "currentRegionName")
    @Mapping(source = "currentFaction.id", target = "currentFactionId")
    CharacterDTO toDTO(Character character);

    Character toEntity(CharacterDTO characterDTO);
}
