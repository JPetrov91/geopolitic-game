package com.example.backend.mapper;

import com.example.backend.dto.MarketItemDTO;
import com.example.backend.entity.MarketItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MarketItemMapper {

    MarketItemDTO toDTO(MarketItem marketItem);

    MarketItem toEntity(MarketItemDTO marketItemDTO);
}
