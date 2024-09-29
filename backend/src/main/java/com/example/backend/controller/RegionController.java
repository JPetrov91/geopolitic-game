package com.example.backend.controller;

import com.example.backend.entity.Region;
import com.example.backend.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/regions")
public class RegionController {

    @Autowired
    private RegionService regionService;

    // Получение всех регионов
    @GetMapping
    public ResponseEntity<List<Region>> getAllRegions() {
        return ResponseEntity.ok().body(regionService.getAllRegions());
    }

    // Получение региона по ID
    @GetMapping("/{id}")
    public ResponseEntity<Region> getRegionById(@PathVariable Long id) {
        Region region = regionService.findRegionById(id);
        return region != null ? ResponseEntity.ok().body(region) : ResponseEntity.notFound().build();
    }

    @GetMapping("region/{name}")
    public ResponseEntity<Region> getRegionByName(@PathVariable String name) {
        Region region = regionService.findRegionByName(name);
        return region != null ? ResponseEntity.ok().body(region) : ResponseEntity.notFound().build();
    }

}
