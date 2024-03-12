package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.dto.AthAnswerDTO;
import com.gardengroup.agroplantationapp.dto.LoginDTO;
import com.gardengroup.agroplantationapp.dto.RegisterDTO;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class ControllerPortal {

    @Autowired
    private UserService userService;

    @Operation(summary = "Registrar usuario", description = "Endpoint para registrar un nuevo usuario", tags = {"Auth"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuario registrado correctamente",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "409", description = "Conflicto - Este correo electrónico ya está registrado",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
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

    @Operation(summary = "Iniciar sesión", description = "Endpoint para autenticar y obtener un token de acceso", tags = {"Auth"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Autenticación exitosa",
                    content = @Content(schema = @Schema(implementation = AthAnswerDTO.class))),
            @ApiResponse(responseCode = "401", description = "No autorizado - Error al autenticar",
                    content = @Content(schema = @Schema(implementation = AthAnswerDTO.class)))
    })
    @PostMapping("/login")
    public ResponseEntity<AthAnswerDTO> login(@RequestBody LoginDTO LoginDto) {
        try {
            AthAnswerDTO answer = userService.authenticate(LoginDto);
            return new ResponseEntity<>(answer, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new AthAnswerDTO("Error al autenticar"), HttpStatus.UNAUTHORIZED);
        }
    }

    


}
