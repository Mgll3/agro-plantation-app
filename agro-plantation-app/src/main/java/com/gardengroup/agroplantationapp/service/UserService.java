package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.dto.user.AthAnswerDTO;
import com.gardengroup.agroplantationapp.dto.user.LoginDTO;
import com.gardengroup.agroplantationapp.dto.user.RegisterDTO;
import com.gardengroup.agroplantationapp.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.entity.StateRequest;
import com.gardengroup.agroplantationapp.entity.User;
import com.gardengroup.agroplantationapp.entity.UserType;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.repository.ProducerRequestRepository;
import com.gardengroup.agroplantationapp.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    public User createUser(RegisterDTO dtoRegistrer) throws OurException {
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

    @Transactional
    public AthAnswerDTO authenticate(LoginDTO LoginDTO) {
        String token = securityService.authenticate(LoginDTO);
        User user = userRepository.searchEmail(LoginDTO.getEmail());
        return new AthAnswerDTO(token, user.getName(), user.getLastname(), user.getUserType().getType());
    }

    @Transactional
    public AthAnswerDTO getUserSession(HttpServletRequest request) {
        String email = securityService.getEmail(request);
        
        User user = userRepository.searchEmail(email);
        AthAnswerDTO answer = new AthAnswerDTO(user.getName(), user.getLastname(), user.getUserType().getType());
        return answer;
    }

}
