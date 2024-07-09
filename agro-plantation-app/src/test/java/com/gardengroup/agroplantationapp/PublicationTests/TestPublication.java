package com.gardengroup.agroplantationapp.PublicationTests;

import java.time.LocalDateTime;

import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.gardengroup.agroplantationapp.controller.AuthController;
import com.gardengroup.agroplantationapp.controller.PublicationController;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.Plantation;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;
import com.gardengroup.agroplantationapp.model.entity.User;


public class TestPublication {
    
    @Autowired
    PublicationController publicationController = Mockito.mock(PublicationController.class);
    @Autowired
    AuthController authController = Mockito.mock(AuthController.class);

    User producerUser = new User();

    @BeforeAll
    public void createUser(){
        //Inicializar usuario
        RegisterDTO registerDto = new RegisterDTO("mgl@gmail.com", "Miguel", 
            "Alvarez", "Calle 123", "123456");
        
        //Guardar usuario
        ResponseEntity<?> responseEntity = authController.register(registerDto);

        if (responseEntity.getBody() instanceof User) {
            producerUser = (User) responseEntity.getBody();
        }
        

    }


    @Test
    public void  shouldCanSavePublication(){
        
        //TODO: Arrange

        //Logear usuario

        

        //Crear publicación
        Publication publication = new Publication();
        publication.setTitle("Publication 1");
        publication.setPlantation(new Plantation());
        publication.setAuthor(producerUser);
        publication.setPublicationDate(LocalDateTime.now());
        publication.setVisibility(true);
        publication.setScore(0);
        publication.setAuthorizationStatus(new StateRequest());

        //TODO: Act
        //Guardar publicación 

        


        //TODO: Assert
        
    }


}
