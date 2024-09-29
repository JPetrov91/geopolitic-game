package com.example.backend;

import com.example.backend.entity.Character;
import com.example.backend.repository.CharacterRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.*;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class CharacterIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CharacterRepository characterRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        characterRepository.deleteAll();
    }

    @Test
    public void testCreateCharacter_Success() throws Exception {
        Character character = new Character();
        character.setNickname("Warrior");
        character.setAvatar("https://example.com/avatar-warrior.png");
        // Установите другие поля по необходимости

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Character> request = new HttpEntity<>(character, headers);

        ResponseEntity<Character> response = restTemplate.postForEntity("/api/characters", request, Character.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isNotNull();

        Optional<Character> savedCharacter = characterRepository.findById(Math.toIntExact(response.getBody().getId()));
        assertThat(savedCharacter).isPresent();
        assertThat(savedCharacter.get().getNickname()).isEqualTo("Warrior");
    }

    @Test
    public void testCreateCharacter_InvalidInput() throws Exception {
        Character character = new Character();
        // Не устанавливаем обязательные поля, например, nickname

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Character> request = new HttpEntity<>(character, headers);

        ResponseEntity<String> response = restTemplate.postForEntity("/api/characters", request, String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}
