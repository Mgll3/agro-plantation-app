package com.gardengroup.agroplantationapp.service;


import com.gardengroup.agroplantationapp.dtos.DtoRegistrer;
import com.gardengroup.agroplantationapp.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.entity.StateRequest;
import com.gardengroup.agroplantationapp.entity.User;
import com.gardengroup.agroplantationapp.entity.UserType;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.repository.ProducerRequestRepository;
import com.gardengroup.agroplantationapp.repository.StateRequestRepository;
import com.gardengroup.agroplantationapp.repository.UserRepository;
import com.gardengroup.agroplantationapp.repository.UserTypeRepository;
import com.gardengroup.agroplantationapp.security.JwtAuthenticationFilter;
import com.gardengroup.agroplantationapp.security.JwtTokenProvider;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private ProducerRequestRepository producerRequestRepository;
    
    @Transactional
    public User createUser(DtoRegistrer dtoRegistrer) throws OurException {
        User user = new User();
        user.setEmail(dtoRegistrer.getEmail());
        user.setPassword(securityService.passwordEncoder(dtoRegistrer.getPassword()));
        user.setName(dtoRegistrer.getName());
        user.setLastname(dtoRegistrer.getLastname());
        user.setAddress(dtoRegistrer.getAddress());

        // Asignar el tipo de usuario 1 en base de datos osea "USER"
        user.setUserType(new UserType(1L));
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

    @Transactional
    public void sendProducerRequest(String userEmail) throws OurException {
        // Obtener el usuario por su correo electrónico
        User user = userRepository.searchEmail(userEmail);

        // Verificar si el usuario existe
        if (user == null) {
            throw new OurException("Usuario no encontrado");
        }

        // Crear la solicitud del productor
        ProducerRequest producerRequest = new ProducerRequest();
        producerRequest.setUser(user);
        producerRequest.setDate(new Date());
        producerRequest.setStaterequest(new StateRequest(1L));

        // Guardar la solicitud del productor
        producerRequestRepository.save(producerRequest);
    }



}
