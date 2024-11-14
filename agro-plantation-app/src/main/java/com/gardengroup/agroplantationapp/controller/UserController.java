package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.model.dto.user.AthAnswerDTO;
import com.gardengroup.agroplantationapp.service.interfaces.IUserService;
import com.gardengroup.agroplantationapp.service.implementation.SecurityService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/v1/user")
@CrossOrigin(origins = "*")
@Slf4j
public class UserController {

    @Autowired
    private IUserService userService;
    @Autowired
    private SecurityService securityService;

    @Operation(summary = "Obtener sesión de usuario", description = "Endpoint para obtener la sesión de usuario con el token de autenticación", tags = {
            "User" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Sesión de usuario obtenida con éxito", content = @Content(schema = @Schema(implementation = AthAnswerDTO.class))),
            @ApiResponse(responseCode = "401", description = "No autorizado - Token de autenticación inválido", content = @Content(schema = @Schema(implementation = Void.class)))
    })
    @GetMapping("/userSession")
    public ResponseEntity<AthAnswerDTO> userSession(HttpServletRequest request) {
        try {
            AthAnswerDTO answer = userService.getUserSession(request);
            return ResponseEntity.ok(answer);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals("User not found")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @Operation(summary = "Borrar cuenta de usuario", description = "Endpoint para que un usuario borre su propia cuenta, necesita token", tags = {
            "User" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Cuenta de usuario borrada con éxito"),
            @ApiResponse(responseCode = "401", description = "No autorizado - Token inválido o no coincide con el usuario")
    })
    @DeleteMapping("/deleteUser")
    @Transactional
    public ResponseEntity<Void> deleteUser(HttpServletRequest request) {
        try {
            String email = securityService.getEmail(request);
            userService.deleteUser(email);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals("User not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
