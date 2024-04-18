package com.gardengroup.agroplantationapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.gardengroup.agroplantationapp.model.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.security.JwtAuthenticationFilter;
import com.gardengroup.agroplantationapp.security.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class SecurityService {
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    
    public String getEmail(HttpServletRequest request) {
        String Token = jwtAuthenticationFilter.getRequestToken(request);
        String email = jwtTokenProvider.getJwtUser(Token);
        return email;
    }

    public String passwordEncoder(String password) {
        return passwordEncoder.encode(password);
    }

    public String authenticate(LoginDTO dtoLogin) { 
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dtoLogin.getEmail(), dtoLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        return token;
    }
    
}
