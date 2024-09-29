package com.example.backend.service;

import com.example.backend.entity.Region;
import com.example.backend.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class RegionServiceImpl implements RegionService {

    @Autowired
    private RegionRepository regionRepository;

    @Override
    public Region findRegionById(Long id) {
        Optional<Region> region = regionRepository.findById(id);
        return region.orElse(null);
    }

    @Override
    public Region findRegionByName(String regionName) {
        Optional<Region> region = regionRepository.findByName(regionName);
        return region.orElse(null);
    }

    @Override
    public List<Region> getAllRegions() {
        return regionRepository.findAll();
    }

    @Override
    public Region getRandomRegion() {
        long regionsCount = regionRepository.count();
        int randomRegionId = new Random().nextInt((int) regionsCount)+ 1;
        return findRegionById((long) randomRegionId);
    }
}
