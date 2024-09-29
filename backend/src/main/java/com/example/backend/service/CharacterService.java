package com.example.backend.service;

import com.example.backend.entity.Character;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

public interface CharacterService {

    /**
     * Загружает персонажа по имени пользователя.
     *
     * @param username имя пользователя
     * @return Optional с персонажем или пустой
     */
    Character loadCharacterForUser(String username);

    /**
     * Получает персонажа по его ID.
     *
     * @param characterId ID персонажа
     * @return Optional с персонажем или пустой
     */
    Character getCharacterById(Integer characterId);

    /**
     * Создает нового персонажа для пользователя.
     *
     * @param username имя пользователя
     * @param character объект персонажа
     * @return созданный персонаж
     * @throws IllegalStateException если у пользователя уже есть персонаж
     */
    Character createCharacter(String username, Character character);

    /**
     * Обновляет существующего персонажа.
     *
     * @param character объект персонажа
     * @return обновленный персонаж
     * @throws IllegalArgumentException если персонаж не существует
     */
    Character updateCharacter(Character character);
}