package com.example.backend.repository;

import com.example.backend.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {
    Optional<Character> findByUserUsername(String username);
}
