package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.dto.AthAnswerDTO;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.service.SecurityService;
import com.gardengroup.agroplantationapp.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/v1/user")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    @Autowired
    private SecurityService securityService;

    @Operation(summary = "Solicitar ser productor", description = "Endpoint para solicitar ser productor", tags = {"User"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitud creada con éxito",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta - Error al crear la solicitud",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
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

    @Operation(summary = "Obtener sesión de usuario", 
    description = "Endpoint para obtener la sesión de usuario con el token de autenticación", tags = {"User"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Sesión de usuario obtenida con éxito",
                    content = @Content(schema = @Schema(implementation = AthAnswerDTO.class)))
    })
    @GetMapping("/userSession")
    public ResponseEntity<?> userSession(HttpServletRequest request) {
        
        AthAnswerDTO answer = userService.getUserSession(request);
        return ResponseEntity.ok(answer);
        
    }
}

