package com.example.backend.service;

import com.example.backend.entity.Region;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface RegionService {

    Region findRegionById(Long id);

    Region findRegionByName(String regionName);

    List<Region> getAllRegions();

    Region getRandomRegion();
}
