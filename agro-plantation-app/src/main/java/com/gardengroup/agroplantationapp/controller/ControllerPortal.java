package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.dto.AthAnswerDTO;
import com.gardengroup.agroplantationapp.dto.LoginDTO;
import com.gardengroup.agroplantationapp.dto.RegisterDTO;
import com.gardengroup.agroplantationapp.exceptions.OurException;

import com.gardengroup.agroplantationapp.service.SecurityService;
import com.gardengroup.agroplantationapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class ControllerPortal {


    @Autowired
    private UserService userService;
    @Autowired
    private SecurityService securityService;
    
    @PostMapping("/registro")
    public ResponseEntity<String> record(@RequestBody RegisterDTO dtoRegistrer) {
        try {
            // Verifica si el correo electrónico ya existe
            if (userService.existsEmail(dtoRegistrer.getEmail())) {
                // Si el correo electrónico ya existe, devuelve un mensaje indicando que el usuario ya existe
                return new ResponseEntity<>("Este correo electrónico ya está registrado.", HttpStatus.CONFLICT);
            }

            // Llama al método en el servicio para crear el usuario a partir del DTO
            userService.createUser(dtoRegistrer);

            // Creación exitosa, devuelve una respuesta con HttpStatus.CREATED y el mensaje
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado correctamente!");
        } catch (OurException ex) {
            // En caso de otros errores, devuelve una respuesta con HttpStatus.NOT_IMPLEMENTED
            System.out.println(ex.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(ex.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AthAnswerDTO> login(@RequestBody LoginDTO dtoLogin) {
        try {
            String token = securityService.authenticate(dtoLogin);
            return new ResponseEntity<>(new AthAnswerDTO(token), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new AthAnswerDTO("Error al autenticar"), HttpStatus.UNAUTHORIZED);
        }
    }


}
