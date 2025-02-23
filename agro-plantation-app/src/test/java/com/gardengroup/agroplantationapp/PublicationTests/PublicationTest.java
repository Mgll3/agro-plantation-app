package com.gardengroup.agroplantationapp.PublicationTests;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationUpdDTO;
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.Plantation;
import com.gardengroup.agroplantationapp.model.entity.User;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS) // Para que se ejecute el BeforeAll
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS) // limpiar bd despues de pruebas
class PublicationTest {

    private User producerUser = new User();
    private String accessToken = null;
    PublicationSaveDTO publicationSaveDto = new PublicationSaveDTO();

    @Autowired
    private MockMvc mockMvc; // Simular peticiones HTTP

    @Autowired
    private ObjectMapper objectMapper; // Convertir objetos a JSON

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

    @DisplayName("Guardar una publicación en el sistema")
    @Test
    void shouldSavePublication() throws Exception {

        ResultActions response = mockMvc.perform(post("/v1/publication/save")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                .content(objectMapper.writeValueAsString(publicationSaveDto)));

        response.andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", Matchers.notNullValue()))
                .andExpect(jsonPath("$.title", Matchers.is(publicationSaveDto.getTitle())))
                .andExpect(jsonPath("$.author.name", Matchers.is(producerUser.getName())));
    }

    @DisplayName("Obtener publicación guardada anteriormente")
    @Test
    void shouldGetOnePublication() throws Exception {
        // Guardar la publicación
        ResultActions saveResponse = mockMvc.perform(post("/v1/publication/save")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                .content(objectMapper.writeValueAsString(publicationSaveDto)));

        // Obtengo el id de la publicación guardada
        MvcResult result = saveResponse.andExpect(status().isCreated()).andReturn();
        String responseBody = result.getResponse().getContentAsString();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        Long publicationId = jsonNode.get("id").asLong();

        ResultActions response = mockMvc.perform(get("/v1/publication/" + publicationId)
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken));

        response.andExpect(status().isOk())
                .andExpect(jsonPath("$.id", Matchers.is(publicationId.intValue())))
                .andExpect(jsonPath("$.title", Matchers.is(publicationSaveDto.getTitle())))
                .andExpect(jsonPath("$.author.name", Matchers.is(producerUser.getName())));

    }

    @DisplayName("Actualizar una publicación ya creada")
    @Test
    void shouldUpdatePublication() throws Exception {
        // Guardar publicación
        ResultActions saveResponse = mockMvc.perform(post("/v1/publication/save")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                .content(objectMapper.writeValueAsString(publicationSaveDto)));

        // Obtengo el id de la publicación guardada
        MvcResult result = saveResponse.andExpect(status().isCreated()).andReturn();
        String responseBody = result.getResponse().getContentAsString();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        Long publicationId = jsonNode.get("id").asLong();

        PublicationUpdDTO publicationUpdDto = new PublicationUpdDTO();
        publicationUpdDto.setId(publicationId);
        publicationUpdDto.setTitle("Publication 2");
        Plantation plantation = publicationSaveDto.getPlantation();
        plantation.setArea("200 sqm");
        publicationUpdDto.setPlantation(plantation);

        ResultActions updateResponse = mockMvc.perform(put("/v1/publication")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(publicationUpdDto)));

        updateResponse.andExpect(status().isOk())
                .andExpect(jsonPath("$.title", Matchers.is(publicationUpdDto.getTitle())))
                .andExpect(jsonPath("$.plantation.area", Matchers.is(plantation.getArea())));

    }

    @DisplayName("Obtener publicaciones aleatorias con minimo 1 y maximo 15 publicaciones con todas las paginaciones correctas")
    @Test
    void shouldGetPublicationsByAleatory() throws Exception {

        // Crear 136 publicaciones para testear, + 6 precreadas = 142 publicaciones
        for (int i = 0; i < 136; i++) {
            mockMvc.perform(post("/v1/publication/save")
                    .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("Authorization", "Bearer " + accessToken) // Agrego el token JWT
                    .content(objectMapper.writeValueAsString(publicationSaveDto)));
        }

        ResultActions response1 = mockMvc.perform(get("/v1/publication/aleatory/1")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON));

        response1.andExpect(status().isOk())
                .andExpect(jsonPath("$.publications", Matchers.notNullValue()))
                .andExpect(jsonPath("$.publications", Matchers.hasSize(Matchers.lessThanOrEqualTo(15))))
                .andExpect(jsonPath("$.pagination", Matchers.lessThanOrEqualTo(3)));

        // Verificar paginacion en pagina 3
        ResultActions response2 = mockMvc.perform(get("/v1/publication/aleatory/3")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON));

        response2.andExpect(status().isOk())
                .andExpect(jsonPath("$.publications", Matchers.notNullValue()))
                .andExpect(jsonPath("$.publications", Matchers.hasSize(Matchers.lessThanOrEqualTo(15))))
                .andExpect(jsonPath("$.pagination", Matchers.lessThanOrEqualTo(3)));
        // Verificar paginaciones en las ultimas paginas
        ResultActions response3 = mockMvc.perform(get("/v1/publication/aleatory/10")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON));

        response3.andExpect(status().isOk())
                .andExpect(jsonPath("$.publications", Matchers.notNullValue()))
                .andExpect(jsonPath("$.publications", Matchers.hasSize(Matchers.lessThanOrEqualTo(15))))
                .andExpect(jsonPath("$.pagination", Matchers.equalTo(0)));

        // Verificar paginaciones penultima pagina
        ResultActions response4 = mockMvc.perform(get("/v1/publication/aleatory/9")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON));

        response4.andExpect(status().isOk())
                .andExpect(jsonPath("$.publications", Matchers.notNullValue()))
                .andExpect(jsonPath("$.publications", Matchers.hasSize(Matchers.lessThanOrEqualTo(15))))
                .andExpect(jsonPath("$.pagination", Matchers.equalTo(1)));

        // Verificar paginaciones en antepenultima pagina
        ResultActions response5 = mockMvc.perform(get("/v1/publication/aleatory/8")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON));

        response5.andExpect(status().isOk())
                .andExpect(jsonPath("$.publications", Matchers.notNullValue()))
                .andExpect(jsonPath("$.publications", Matchers.hasSize(Matchers.lessThanOrEqualTo(15))))
                .andExpect(jsonPath("$.pagination", Matchers.equalTo(2)));

        // Verificar paginacion en 3 paginas antes que la ultima pagina
        ResultActions response6 = mockMvc.perform(get("/v1/publication/aleatory/7")
                .with(SecurityMockMvcRequestPostProcessors.csrf()) // TOKEN CSRF de seguridad
                .contentType(MediaType.APPLICATION_JSON));

        response6.andExpect(status().isOk())
                .andExpect(jsonPath("$.publications", Matchers.notNullValue()))
                .andExpect(jsonPath("$.publications", Matchers.hasSize(Matchers.lessThanOrEqualTo(15))))
                .andExpect(jsonPath("$.pagination", Matchers.equalTo(3)));
    }

}
