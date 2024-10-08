// src/test/java/com/example/backend/CharacterRepositoryTest.java

package com.example.backend.repository;

import com.example.backend.entity.Character;
import com.example.backend.repository.CharacterRepository;
import net.bytebuddy.utility.dispatcher.JavaDispatcher;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.testcontainers.containers.PostgreSQLContainer;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Testcontainers
public class CharacterRepositoryTest {

    @Container
    public static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("user")
            .withPassword("password");

    @Autowired
    private CharacterRepository characterRepository;

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
    }

    @Test
    public void testSaveCharacter() {
        Character character = new Character();
        character.setNickname("Rogue");
        character.setAvatar("https://example.com/avatar-rogue.png");
        // Установите другие поля по необходимости

        Character savedCharacter = characterRepository.save(character);

        assertThat(savedCharacter.getId()).isNotNull();
        assertThat(savedCharacter.getNickname()).isEqualTo("Rogue");
    }
}
