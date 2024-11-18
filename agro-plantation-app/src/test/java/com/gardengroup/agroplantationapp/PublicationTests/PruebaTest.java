package com.gardengroup.agroplantationapp.PublicationTests;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.Plantation;
import com.gardengroup.agroplantationapp.model.entity.User;

//@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@TestInstance(Lifecycle.PER_CLASS) // Para que se ejecute el BeforeAll
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS) // limpiar bd despues de pruebas
class PruebaTests {

    @Container
    @ServiceConnection
    public static MySQLContainer<?> mysql = new MySQLContainer<>(DockerImageName.parse("mysql:8.0.26"))
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass");

    @Autowired
    private MockMvc mockMvc; // Simular peticiones HTTP
    @Autowired
    private ObjectMapper objectMapper = new ObjectMapper(); // Convertir objetos a JSON

    private User producerUser = new User();
    private String accessToken = null;
    PublicationSaveDTO publicationSaveDto = new PublicationSaveDTO();

    // @Test
    public void connectionEstablished() throws Exception {
        assertThat(mysql.isCreated()).isTrue();
        assertThat(mysql.isRunning()).isTrue();

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
    }

}
