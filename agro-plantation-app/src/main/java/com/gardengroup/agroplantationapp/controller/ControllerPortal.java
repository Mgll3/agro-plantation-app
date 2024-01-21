package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class ControllerPortal {
    @Autowired
    private UserService userService;

    @GetMapping("/")//localhost:8080/
    public String index() {

        return "index.html";
    }
    @GetMapping("/registrar")
    public String registrar() {
        return "registro.html";

    }

    @PostMapping("/registro")
    public ResponseEntity<?> record(@RequestBody User user) {

        try {
            userService.createUser(user);

            // Creación exitosa, devuelve una respuesta con HttpStatus.CREATED
            return new ResponseEntity<>("Usuario registrado correctamente!", HttpStatus.CREATED);
        } catch (OurException ex) {
            // En caso de error, devuelve una respuesta con HttpStatus.NOT_IMPLEMENTED
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(ex.getMessage());
        }
    }
    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam(required = false) String error) {
        if (error != null) {
            // En caso de error, devuelve una respuesta con HttpStatus.BAD_REQUEST
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuario o Contraseña invalidos!");
        }

        // Si no hay error, devuelve una respuesta con HttpStatus.OK
        return ResponseEntity.ok("Bienvenido a la página de inicio de sesión");
    }


}
