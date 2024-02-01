package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.dtos.DtoRegistrer;
import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.entities.UserType;
import com.gardengroup.agroplantationapp.exceptions.OurException;

import com.gardengroup.agroplantationapp.repository.UserTypeRepository;
import com.gardengroup.agroplantationapp.security.JwtTokenProvider;
import com.gardengroup.agroplantationapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/")
public class ControllerPortal {
    @Autowired
    private AuthenticationManager authenticationManager;// Gestor de autenticación para verificar las credenciales enviadas durante el inicio de sesión
    @Autowired
    private PasswordEncoder passwordEncoder;// Codificador de contraseñas utilizado para almacenar contraseñas de manera segura
    @Autowired
    private JwtTokenProvider jwtTokenProvider;// Proveedor de tokens JWT encargado de generar y validar tokens de autenticación

    @Autowired
    private UserTypeRepository userTypeRepository;

    @Autowired
    private UserService userService;



    @PostMapping("/registro")
    public ResponseEntity<String> record(@RequestBody DtoRegistrer dtoRegistrer) {
        try {
            // Verifica si el correo electrónico ya existe
            if (userService.existsEmail(dtoRegistrer.getEmail())) {
                // Si el correo electrónico ya existe, devuelve un mensaje indicando que el usuario ya existe
                return new ResponseEntity<>("Este correo electrónico ya está registrado.", HttpStatus.CONFLICT);
            }

            User user = new User();
            user.setEmail(dtoRegistrer.getEmail());
            user.setPassword(passwordEncoder.encode(dtoRegistrer.getPassword()));

            // Obtén el tipo de usuario "USER" (ajusta el método según tu implementación real)
            UserType userType = userTypeRepository.finByType("USER").getUserType();

            // Verifica si el tipo de usuario existe
            if (userType == null) {
                throw new OurException("Tipo de usuario no encontrado."); // o maneja este error de otra manera
            }

            user.setUserType(userType);

            // Guarda el usuario en la base de datos
            userService.createUser(user);

            // Creación exitosa, devuelve una respuesta con HttpStatus.CREATED y el mensaje
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado correctamente!");
        } catch (OurException ex) {
            // En caso de otros errores, devuelve una respuesta con HttpStatus.NOT_IMPLEMENTED
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(ex.getMessage());
        }
    }



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User userNew = userService.findByUserEmail(user.getEmail());

        if (userNew != null && userNew.getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>("Login exitoso", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);
        }
    }


}
