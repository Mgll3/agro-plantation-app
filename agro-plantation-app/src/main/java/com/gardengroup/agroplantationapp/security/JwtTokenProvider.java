package com.gardengroup.agroplantationapp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    // Método para generar un token JWT con información de autenticación
    public String generateToken(Authentication authentication) {
        // Obtener el nombre de usuario (en este caso, el email) del objeto Authentication
        String email = authentication.getName();

        // Obtener la fecha actual
        Date now = new Date();

        // Calcular la fecha de expiración del token sumando el tiempo de expiración configurado
        Date expirationDate = new Date(now.getTime() + ConstantSecurity.JWT_EXPIRATION_TOKEN);

        // Construir el token JWT con el Builder de Jwts
        String token = Jwts.builder()
                .setSubject(email) // Establecer el sujeto del token como el email del usuario
                .setIssuedAt(now) // Establecer la fecha de emisión del token
                .setExpiration(expirationDate) // Establecer la fecha de expiración del token
                .signWith(SignatureAlgorithm.HS512, ConstantSecurity.JWT_SIGNATURE) // Firmar el token con el algoritmo y clave secreta
                .compact(); // Compactar el token en una cadena

        // Devolver el token generado
        return token;
    }

    // Método para obtener el nombre de usuario (email) a partir de un token JWT
    public String getJwtUser(String token) {
        // Utilizar el parser de Jwts para obtener los claims (reclamaciones) del token
        Claims claims = Jwts.parser()
                .setSigningKey(ConstantSecurity.JWT_SIGNATURE) // Establecer la clave secreta para validar la firma
                .parseClaimsJws(token) // Realizar el parsing del token
                .getBody(); // Obtener el cuerpo del token, que contiene los claims

        // Devolver el nombre de usuario (email) obtenido de los claims
        return claims.getSubject();
    }

    // Método para validar un token JWT
    public Boolean validateToken(String token) {
        try {
            // Intentar realizar el parsing del token, si tiene una firma válida
            Jwts.parser().setSigningKey(ConstantSecurity.JWT_SIGNATURE).parseClaimsJws(token);

            // Si el parsing es exitoso, el token es válido
            return true;
        } catch (Exception e) {
            // Agregar logs para ver más detalles sobre la excepción
            System.out.println("Error al validar el token: " + e.getMessage());
            // Si ocurre una excepción durante el parsing, el token no es válido
            throw new AuthenticationCredentialsNotFoundException("JWT ha expirado o está incorrecto");
        }
    }
}
