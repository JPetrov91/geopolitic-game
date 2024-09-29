package com.example.backend;

import com.example.backend.entity.Character;
import com.example.backend.repository.CharacterRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.hamcrest.Matchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CharacterApiTest {

    @LocalServerPort
    private int port;

    @Autowired
    private CharacterRepository characterRepository;

    @BeforeEach
    public void setup() {
        RestAssured.port = port;
        characterRepository.deleteAll();
    }

    @Test
    public void testCreateCharacter() {
        Character character = new Character();
        character.setNickname("Mage");
        character.setAvatar("https://example.com/avatar-mage.png");
        // Установите другие поля по необходимости

        RestAssured.given()
                .contentType(ContentType.JSON)
                .body(character)
                .when()
                .post("/api/characters")
                .then()
                .statusCode(201)
                .body("nickname", equalTo("Mage"))
                .body("avatar", equalTo("https://example.com/avatar-mage.png"));
    }

    @Test
    public void testGetCharacter_NotFound() {
        RestAssured.given()
                .when()
                .get("/api/characters/999")
                .then()
                .statusCode(404);
    }
}
