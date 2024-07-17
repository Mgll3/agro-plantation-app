package com.gardengroup.agroplantationapp.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Inyección de dependencia para el manejador de autenticación de JWT
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    // Configuración del AuthenticationManager
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Configuración del codificador de contraseñas (BCryptPasswordEncoder)
    @Bean
    PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // Creación de un filtro personalizado para autenticación basada en JWT
    @Bean
    JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();

        // Permitir todos los orígenes
        configuration.setAllowedOrigins(Arrays.asList("*"));

        // Permitir todos los métodos
        configuration.setAllowedMethods(Arrays.asList("*"));

        // Permitir todas las cabeceras
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // Permitir credenciales
        configuration.setAllowCredentials(true);

        // Aplicar la configuración de CORS en todos los caminos
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    // Configuración de la cadena de filtros de seguridad HTTP
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http    
                .cors().disable()  // Desactiva la protección CORS
                .csrf().disable()  // Desactiva la protección CSRF
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)  // Configura el punto de entrada para errores de autenticación JWT
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Configura la política de creación de sesiones como STATELESS (sin sesiones)
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/auth/**", "/v1/user/**", "/publication/publications/top", "/v1/publication/**", "/v1/producerRequest/**", "/swagger-ui/**", "/swagger-ui.html/**", "/v3/api-docs/**", "/logs/**").permitAll() // Permite acceso sin autenticación a las páginas de inicio, registro y login
                .requestMatchers("/configuracion").hasAuthority("ADMINISTRATOR")
                .anyRequest().authenticated()  // Requiere autenticación para cualquier otra solicitud
                .and()
                .httpBasic();  // Configura la autenticación básica HTTP

        // Agrega el filtro personalizado JwtAuthenticationFilter antes del filtro de autenticación de nombre de usuario y contraseña
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}