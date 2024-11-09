package com.gardengroup.agroplantationapp.UserTests;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlGroup;
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

//Ejecutar el script importTest.sql antes de ejecutar las pruebas
@SqlGroup({
        @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_CLASS, scripts = "classpath:importTest.sql")

})

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD) // limpiar bd despues de pruebas
// @ActiveProfiles("test")
class UserTest {

    private User user;

    @Autowired
    private MockMvc mockMvc; // Simular peticiones HTTP

    @Autowired
    private ObjectMapper objectMapper; // Convertir objetos a JSON

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
        RegisterDTO registerDto = new RegisterDTO("mgl@gmail.com", "1", "Miguel",
                "Alvarez", "Calle 123");

        // Guardar usuario por medio del endpoint
        mockMvc.perform(post("/auth/registro")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDto)));

        // Recibir el usuario guardado y copiarlo a un objeto User general
        // user =
        // objectMapper.readValue(response.andReturn().getResponse().getContentAsString(),
        // User.class);

        // Inicializar loggeo
        LoginDTO loginDto = new LoginDTO("mgl@gmail.com", "1");

        // Loggear usuario desde el endpoint
        ResultActions response = mockMvc.perform(post("/auth/login")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDto)));

        // Verificar loggeo correcto con token de acceso y datos del usuario
        response.andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", Matchers.notNullValue()))
                .andExpect(jsonPath("$.name", Matchers.is(registerDto.getName())))
                .andExpect(jsonPath("$.lastname", Matchers.is(registerDto.getLastname())));
    }

    @DisplayName("Obtener sesión de usuario")
    @Test
    void shouldCanGetUserSession() throws Exception {
        // Inicializar usuario
        RegisterDTO registerDto = new RegisterDTO("mgl@gmail.com", "1", "Miguel",
                "Alvarez", "Calle 123");

        // Guardar usuario por medio del endpoint
        mockMvc.perform(post("/auth/registro")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registerDto)));

        // Inicializar loggeo
        LoginDTO loginDto = new LoginDTO("mgl@gmail.com", "1");

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

}
