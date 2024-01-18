package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    public ResponseEntity<?> record(@RequestParam String name, @RequestParam String lastname, @RequestParam String email, @RequestParam String address, @RequestParam String password) {
        System.out.println("hola");
        try {
            userService.createUser(name, lastname, email, address, password);

            // Creación exitosa, devuelve una respuesta con HttpStatus.CREATED
            return new ResponseEntity<>("Usuario registrado correctamente!", HttpStatus.CREATED);
        } catch (OurException ex) {
            // En caso de error, devuelve una respuesta con HttpStatus.NOT_IMPLEMENTED
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(ex.getMessage());
        }
    }

}
