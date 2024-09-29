package com.example.backend.controller;

import com.example.backend.entity.Character;
import com.example.backend.service.CharacterService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(CharacterController.class)
public class CharacterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CharacterService characterService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetCharacterById_Success() throws Exception {
        Character character = new Character();
        character.setId(1L);
        character.setNickname("Hero");
        character.setAvatar("https://example.com/avatar.png");
        // Установите другие поля по необходимости

        Mockito.when(characterService.getCharacterById(1))
                .thenReturn(character);

        mockMvc.perform(get("/api/characters/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value("Hero"))
                .andExpect(jsonPath("$.avatar").value("https://example.com/avatar.png"));
    }

    @Test
    public void testGetCharacterById_NotFound() throws Exception {
        Mockito.when(characterService.getCharacterById(1))
                .thenReturn(null);

        mockMvc.perform(get("/api/characters/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
