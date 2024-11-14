package com.gardengroup.agroplantationapp.VoteTests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.Plantation;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.User;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD) // limpiar bd despues de pruebas
class VoteTest {

    @Autowired
    private MockMvc mockMvc; // Simular peticiones HTTP

    @Autowired
    private ObjectMapper objectMapper; // Convertir objetos a JSON

    private User producerUser = new User();
    private String accessToken = null;
    private Publication publication = new Publication();

    @BeforeEach
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

        // Crear publicación
        PublicationSaveDTO publicationSaveDto = new PublicationSaveDTO();
        publicationSaveDto.setTitle("Publication 1");
        Plantation plantation = new Plantation();
        plantation.setArea("100 sqm");
        plantation.setHarvestType("organic");
        plantation.setIrrigationType("drip");
        plantation.setProductionType("type1");
        plantation.setDetails(
                "semillas de tomate para cultivo en verano, condiciones de riego: cada 2 días, condiciones de temperatura: 25-30°C");
        plantation.setAddress("Carrera 29 b");
        publicationSaveDto.setPlantation(plantation);

        ResultActions publicationResponse = mockMvc.perform(post("/v1/publication/save")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                .content(objectMapper.writeValueAsString(publicationSaveDto)));

        MvcResult resultPub = publicationResponse.andExpect(status().isCreated()).andReturn();
        String responseBody3 = resultPub.getResponse().getContentAsString();
        JsonNode jsonNode3 = objectMapper.readTree(responseBody3);
        publication = objectMapper.treeToValue(jsonNode3, Publication.class);
    }

    @DisplayName("Guardar un voto nuevo")
    @Test
    void userShouldCanVote() throws Exception {

        ResultActions response = mockMvc.perform(post("/v1/publication/toggleVote/" + publication.getId())
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                .content(objectMapper.writeValueAsString(true)));

        response.andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", Matchers.notNullValue()))
                .andExpect(jsonPath("$.user.id", Matchers.is(producerUser.getId().intValue())))
                .andExpect(jsonPath("$.publication.id", Matchers.is(publication.getId().intValue())));
    }

    @DisplayName("Cambiar voto de una publicación, de positivo a negativo")
    @Test
    void userShouldCanToggleVote() throws Exception {

        ResultActions response = mockMvc.perform(post("/v1/publication/toggleVote/" + publication.getId())
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                .content(objectMapper.writeValueAsString(true)));

        response.andExpect(status().isCreated());

        ResultActions response2 = mockMvc.perform(post("/v1/publication/toggleVote/" + publication.getId())
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                .content(objectMapper.writeValueAsString(true)));

        // Se espera un voto negativo
        response2.andExpect(status().isCreated())
                .andExpect(jsonPath("$.state", Matchers.is(false)));

    }

    @DisplayName("Votar una publicación y que sume uno a su Score")
    @Test
    void shouldCanAddVoteToPublication() throws Exception {
        // Votar positivamente
        ResultActions response = mockMvc.perform(post("/v1/publication/toggleVote/" + publication.getId())
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                .content(objectMapper.writeValueAsString(true)));

        response.andExpect(status().isCreated());

        ResultActions publicationResponse = mockMvc.perform(get("/v1/publication/" + publication.getId())
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken));

        publicationResponse.andExpect(status().isOk())
                .andExpect(jsonPath("$.score", Matchers.is(publication.getScore() + 1)));

    }

}
