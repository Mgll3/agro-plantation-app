package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.security.JwtAuthenticationFilter;
import com.gardengroup.agroplantationapp.security.JwtTokenProvider;
import com.gardengroup.agroplantationapp.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/request-producer")
    public ResponseEntity<?> requestToBecomeProducer(HttpServletRequest request) {
        String token = jwtAuthenticationFilter.getRequestToken(request);
        String email = jwtTokenProvider.getJwtUser(token);

        try {
            userService.sendProducerRequest(email);
            return ResponseEntity.ok("Solicitud para convertirse en productor creada con éxito.");
        } catch (OurException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear la solicitud: " + e.getMessage());
        }
    }
}

