package com.gardengroup.agroplantationapp.PublicationTests;

import java.time.LocalDateTime;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.Plantation;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.service.IUserService;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)   //limpiar bd despues de pruebas
//@ActiveProfiles("test")
public class PublicationTest {
    
    private User producerUser = new User();
    
    @Autowired
    private MockMvc mockMvc;                 //Simular peticiones HTTP

    @Autowired
    private ObjectMapper objectMapper;      //Convertir objetos a JSON



    // @BeforeAll
    // public void registerUser(){
        
        

    // }

    @DisplayName("Guardar una publicación en el sistema")
    @Test
    public void shouldCanSavePublication() throws Exception{

        //Inicializar usuario
        RegisterDTO registerDto = new RegisterDTO("mgl@gmail.com", "1","Miguel", 
            "Alvarez", "Calle 123");
        
        //Guardar usuario por medio del endpoint
        mockMvc.perform(post("/auth/registro")
            .with(SecurityMockMvcRequestPostProcessors.csrf())  //TOKEN CSRF de seguridad
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(registerDto)));

        //Inicializar loggeo
        LoginDTO loginDto = new LoginDTO("mgl@gmail.com","1");

        //Loggear usuario desde el endpoint
        ResultActions userResponse = mockMvc.perform(post("/auth/login")
            .with(SecurityMockMvcRequestPostProcessors.csrf())  //TOKEN CSRF de seguridad
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(loginDto)));

        //Extraer el Token de JWT
        MvcResult result = userResponse.andExpect(status().isOk()).andReturn();
        String responseBody = result.getResponse().getContentAsString();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        String accessToken = jsonNode.get("accessToken").asText();

        //Crear publicación
        PublicationSaveDTO publicationSaveDto = new PublicationSaveDTO();
        publicationSaveDto.setTitle("Publication 1");
        Plantation plantation = new Plantation();
        plantation.setArea("100 sqm");
        plantation.setHarvestType("organic");
        plantation.setIrrigationType("drip");
        plantation.setProductionType("type1");
        plantation.setDetails("semillas de tomate para cultivo en verano, condiciones de riego: cada 2 días, condiciones de temperatura: 25-30°C");
        publicationSaveDto.setPlantation(plantation);

        ResultActions response = mockMvc.perform(post("/v1/publication/save")
            .with(SecurityMockMvcRequestPostProcessors.csrf())  //TOKEN CSRF de seguridad
            .contentType(MediaType.APPLICATION_JSON)
            .header("Authorization", "Bearer " + accessToken)   //Agrego el token JWT
            .content(objectMapper.writeValueAsString(publicationSaveDto)));

        response.andExpect(status().isCreated())
        .andExpect(jsonPath("$.id", Matchers.notNullValue()))
        .andExpect(jsonPath("$.title", Matchers.is(publicationSaveDto.getTitle())))
        .andExpect(jsonPath("$.author.name", Matchers.is(registerDto.getName())));
}


}
