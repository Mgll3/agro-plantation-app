package com.gardengroup.agroplantationapp.UserTests;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.hamcrest.Matchers;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.User;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS) // Para que se ejecute el BeforeAll
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD) // limpiar bd despues de pruebas
class UserTest {

    @Autowired
    private MockMvc mockMvc; // Simular peticiones HTTP

    @Autowired
    private ObjectMapper objectMapper; // Convertir objetos a JSON

    private User producerUser = new User();
    private String accessToken = null;

    @BeforeAll
    void registerAndLoginUser() throws Exception {
        // Inicializar usuario
        RegisterDTO registerDto = new RegisterDTO("mgl@gmail.com", "1", "Miguel",
                "Alvarez", "Calle 123");

        // Guardar usuario por medio del endpoint
        ResultActions userResponse = mockMvc.perform(post("/auth/registro")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDto)));

        // Extraer usuario guardado
        MvcResult result = userResponse.andExpect(status().isCreated()).andReturn();
        String responseBody1 = result.getResponse().getContentAsString();
        JsonNode jsonNode1 = objectMapper.readTree(responseBody1);
        producerUser.setAddress(jsonNode1.get("address").asText());
        producerUser.setName(jsonNode1.get("name").asText());
        producerUser.setEmail(registerDto.getEmail());
        producerUser.setLastname(jsonNode1.get("lastname").asText());
        producerUser.setId(jsonNode1.get("id").asLong());

        // Inicializar loggeo
        LoginDTO loginDto = new LoginDTO("mgl@gmail.com", "1");

        // Loggear usuario desde el endpoint
        ResultActions loginResponse = mockMvc.perform(post("/auth/login")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDto)));

        // Extraer el Token de JWT
        MvcResult resultLog = loginResponse.andExpect(status().isOk()).andReturn();
        String responseBody2 = resultLog.getResponse().getContentAsString();
        JsonNode jsonNode2 = objectMapper.readTree(responseBody2);
        accessToken = jsonNode2.get("accessToken").asText();
    }

    @DisplayName("Registrar un usuario en el sistema")
    @Test
    void shouldCanRegisterUser() throws Exception {
        // Inicializar usuario
        RegisterDTO registerDto = new RegisterDTO("mgl@gmail.com", "1", "Miguel",
                "Alvarez", "Calle 123");

        // Guardar usuario por medio del endpoint
        ResultActions response = mockMvc.perform(post("/auth/registro")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDto)));

        // Verificar que el usuario se haya guardado correctamente con nuevo id y mismos
        // datos
        response.andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", Matchers.notNullValue()))
                .andExpect(jsonPath("$.name", Matchers.is(registerDto.getName())))
                .andExpect(jsonPath("$.lastname", Matchers.is(registerDto.getLastname())))
                .andExpect(jsonPath("$.address", Matchers.is(registerDto.getAddress())));
    }

    @DisplayName("Loggear un usuario ya creado")
    @Test
    void shouldCanLoginAnUser() throws Exception {
        // Inicializar usuario
        RegisterDTO registerDto = new RegisterDTO("mgl3@gmail.com", "1", "Miguel",
                "Alvarez", "Calle 123");

        // Guardar usuario por medio del endpoint
        mockMvc.perform(post("/auth/registro")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDto)));

        // Inicializar loggeo
        LoginDTO loginDto = new LoginDTO(registerDto.getEmail(), registerDto.getPassword());

        // Loggear usuario desde el endpoint
        ResultActions response = mockMvc.perform(post("/auth/login")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDto)));

        // Verificar loggeo correcto con token de acceso y datos del usuario
        response.andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", Matchers.notNullValue()))
                .andExpect(jsonPath("$.name", Matchers.is(producerUser.getName())))
                .andExpect(jsonPath("$.lastname", Matchers.is(producerUser.getLastname())));
    }

    @DisplayName("Obtener sesión de usuario")
    @Test
    void shouldCanGetUserSession() throws Exception {
        // Inicializar usuario
        RegisterDTO registerDto = new RegisterDTO("mgl2@gmail.com", "1", "Miguel",
                "Alvarez", "Calle 123");

        // Guardar usuario por medio del endpoint
        mockMvc.perform(post("/auth/registro")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDto)));

        // Inicializar loggeo
        LoginDTO loginDto = new LoginDTO("mgl2@gmail.com", "1");

        // Loggear usuario desde el endpoint
        ResultActions loginResponse = mockMvc.perform(post("/auth/login")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDto)));

        // Extraer el Token de JWT
        MvcResult result = loginResponse.andExpect(status().isOk()).andReturn();
        String responseBody = result.getResponse().getContentAsString();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String accessToken = jsonNode.get("accessToken").asText();

        ResultActions response = mockMvc.perform(get("/v1/user/userSession")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken)); // Se Agrega el token JWT

        // Verificar loggeo correcto con token de acceso y datos del usuario
        response.andExpect(status().isOk())
                .andExpect(jsonPath("$.name", Matchers.is(registerDto.getName())))
                .andExpect(jsonPath("$.lastname", Matchers.is(registerDto.getLastname())))
                .andExpect(jsonPath("$.userType", Matchers.notNullValue()));
    }

    @DisplayName("Borrar cuenta de usuario")
    @Test
    void shouldCanDeleteUser() throws Exception {

        ResultActions deleteResponse = mockMvc.perform(delete("/v1/user/deleteUser")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken)); // Se Agrega el token JWT

        deleteResponse.andExpect(status().isNoContent());
    }

}
