package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.model.dto.user.AthAnswerDTO;
import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.model.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.service.interfaces.IUserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Slf4j
public class AuthController {

    @Autowired
    private IUserService userService;

    @Operation(summary = "Registrar usuario", description = "Endpoint para registrar un nuevo usuario", tags = {
            "Auth" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuario registrado correctamente", content = @Content(schema = @Schema(implementation = User.class))),
            @ApiResponse(responseCode = "409", description = "Conflicto - Este correo electrónico ya está registrado", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PostMapping("/registro")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDto) {
        // Verifica si el correo electrónico ya existe
        if (userService.existsEmail(registerDto.getEmail())) {
            // Si el correo electrónico ya existe, devuelve un mensaje indicando que el
            // usuario ya existe
            return new ResponseEntity<>("Este correo electrónico ya está registrado.", HttpStatus.CONFLICT);
        }

        // Llama al método en el servicio para crear el usuario a partir del DTO
        User user = userService.createUser(registerDto);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @Operation(summary = "Iniciar sesión", description = "Endpoint para autenticar y obtener un token de acceso", tags = {
            "Auth" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Autenticación exitosa", content = @Content(schema = @Schema(implementation = AthAnswerDTO.class))),
            @ApiResponse(responseCode = "401", description = "No autorizado - Error al autenticar", content = @Content(schema = @Schema(implementation = AthAnswerDTO.class)))
    })
    @PostMapping("/login")
    public ResponseEntity<AthAnswerDTO> login(@RequestBody LoginDTO loginDto) {
        try {
            AthAnswerDTO answer = userService.authenticate(loginDto);
            return new ResponseEntity<>(answer, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            
            if (e.getMessage().equals("User not found")) {
                return new ResponseEntity<>(new AthAnswerDTO("User not found"), HttpStatus.UNAUTHORIZED);
            }
            
            return new ResponseEntity<>(new AthAnswerDTO("Error al autenticar"), HttpStatus.INTERNAL_SERVER_ERROR);
            

        }
    }

}
