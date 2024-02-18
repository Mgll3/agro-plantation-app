package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.dtos.DtoAthAnswer;
import com.gardengroup.agroplantationapp.dtos.DtoLogin;
import com.gardengroup.agroplantationapp.dtos.DtoRegistrer;

import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.exceptions.OurException;

import com.gardengroup.agroplantationapp.security.JwtTokenProvider;
import com.gardengroup.agroplantationapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/")
public class ControllerPortal {


    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;// Proveedor de tokens JWT encargado de generar y validar tokens de autenticación
    @Autowired
    private AuthenticationManager authenticationManager;// Gestor de autenticación para verificar las credenciales enviadas durante el inicio de sesión

    @PostMapping("/registro")
    public ResponseEntity<String> record(@RequestBody DtoRegistrer dtoRegistrer) {
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
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(ex.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<DtoAthAnswer> login(@RequestBody DtoLogin dtoLogin) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dtoLogin.getEmail(), dtoLogin.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);


        return new ResponseEntity<>(new DtoAthAnswer(token), HttpStatus.OK);


    }


}
