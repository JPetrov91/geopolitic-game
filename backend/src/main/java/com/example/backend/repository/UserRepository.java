package com.example.backend.repository;

import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    /**
     * Асинхронный поиск пользователя по имени пользователя.
     *
     * @param username имя пользователя
     * @return CompletableFuture с результатом поиска
     */
    Optional<User> findByUsername(String username);

    /**
     * Асинхронный поиск пользователя по email.
     *
     * @param email email пользователя
     * @return CompletableFuture с результатом поиска
     */
    Optional<User> findByEmail(String email);
}
