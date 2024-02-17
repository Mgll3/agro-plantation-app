package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.dtos.DtoLogin;
import com.gardengroup.agroplantationapp.dtos.DtoRegistrer;
import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.entities.UserType;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.repository.UserRepository;
import com.gardengroup.agroplantationapp.repository.UserTypeRepository;
import com.gardengroup.agroplantationapp.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserTypeRepository userTypeRepository;


    @Transactional
    public User createUser(DtoRegistrer dtoRegistrer) throws OurException {
        User user = new User();
        user.setEmail(dtoRegistrer.getEmail());
        user.setPassword(passwordEncoder.encode(dtoRegistrer.getPassword()));
        user.setName(dtoRegistrer.getName());
        user.setLastname(dtoRegistrer.getLastname());
        user.setAddress(dtoRegistrer.getAddress());

        // Asignar el tipo de usuario como "USER" para todos los usuarios
        UserType userType = userTypeRepository.findByType("USER");

        // Verificar si el tipo de usuario ya existe en la base de datos
        if (userType == null) {
            throw new OurException("Error: Tipo de usuario 'USER' no encontrado en la base de datos.");
            // O puedes manejar esto de alguna manera que tenga sentido para tu aplicación
        }

        user.setUserType(userType);
        user.setTotalAuthorization(false);

        // Guardar el usuario en la base de datos
        return userRepository.save(user);


    }


    public User getOne(Long id) {

        return userRepository.getOne(id);
    }

    public User findByname(String name) {

        return userRepository.searchName(name);
    }


    public Boolean existsEmail(String email) {

        return userRepository.existsByUseremail(email);
    }


}
