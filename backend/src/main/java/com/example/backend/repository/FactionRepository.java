package com.example.backend.repository;

import com.example.backend.entity.Faction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FactionRepository extends JpaRepository<Faction, Long> {
    Optional<Faction> findByName(String name);
}
