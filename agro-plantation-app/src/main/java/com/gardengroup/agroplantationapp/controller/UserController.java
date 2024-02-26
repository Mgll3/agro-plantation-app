package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.service.SecurityService;
import com.gardengroup.agroplantationapp.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private SecurityService securityService;

    @PostMapping("/request-producer")
    public ResponseEntity<?> requestToBecomeProducer(HttpServletRequest request) {

        try {
            String email = securityService.getEmail(request);
            userService.sendProducerRequest(email);
            return ResponseEntity.ok("Solicitud para convertirse en productor creada con éxito.");
        } catch (OurException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear la solicitud: " + e.getMessage());
        }
    }
}

