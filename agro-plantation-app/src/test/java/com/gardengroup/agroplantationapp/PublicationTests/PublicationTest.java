package com.gardengroup.agroplantationapp.PublicationTests;

import java.time.LocalDateTime;


import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import com.fasterxml.jackson.databind.ObjectMapper;

import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.Plantation;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.service.IUserService;


@WebMvcTest
public class PublicationTest {
    
    private User producerUser = new User();

    @MockBean
    private IUserService userService;
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;



    // @BeforeAll
    // public void registerUser(){
        
        

    // }

    @DisplayName("Guardar una publicación en el sistema")
    
    public void  shouldCanSavePublication() throws Exception{
        
        //TODO: Arrange

        //Logear usuario

        

        //Crear publicación
        /* 
        Publication publication = new Publication();
        publication.setTitle("Publication 1");
        publication.setPlantation(new Plantation());
        publication.setAuthor(producerUser);
        publication.setPublicationDate(LocalDateTime.now());
        publication.setVisibility(true);
        publication.setScore(0);
        publication.setAuthorizationStatus(new StateRequest());
        */
        //TODO: Act
        

        


        //TODO: Assert
        

        

        

    }


}
