package com.example.backend.mapper;

import com.example.backend.dto.CreateFactionDTO;
import com.example.backend.dto.FactionDTO;
import com.example.backend.entity.Faction;
import org.mapstruct.*;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FactionMapper {

    // Маппинг из Entity в DTO
    @Mapping(target = "memberIds", source = "members", qualifiedByName = "mapMembersToMemberIds")
    FactionDTO toDTO(Faction faction);

    // Маппинг из DTO в Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "members", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    Faction toEntity(CreateFactionDTO dto);

    // Дополнительные методы для преобразования коллекций
    @Named("mapMembersToMemberIds")
    default Set<Long> mapMembersToMemberIds(Set<com.example.backend.entity.Character> members) {
        return members.stream()
                .map(com.example.backend.entity.Character::getId)
                .collect(Collectors.toSet());
    }
}

