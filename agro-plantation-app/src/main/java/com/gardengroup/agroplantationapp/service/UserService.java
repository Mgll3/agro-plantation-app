package com.gardengroup.agroplantationapp.service;


import com.gardengroup.agroplantationapp.dtos.DtoRegistrer;
import com.gardengroup.agroplantationapp.entities.ProducerRequest;
import com.gardengroup.agroplantationapp.entities.StateRequest;
import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.entities.UserType;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.repository.ProducerRequestRepository;
import com.gardengroup.agroplantationapp.repository.StateRequestRepository;
import com.gardengroup.agroplantationapp.repository.UserRepository;
import com.gardengroup.agroplantationapp.repository.UserTypeRepository;
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
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserTypeRepository userTypeRepository;
    @Autowired
    private StateRequestRepository stateRequestRepository;
    @Autowired
    ProducerRequestRepository producerRequestRepository;


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

    @Transactional
    public void sendProducerRequest(String userEmail) throws OurException {
        // Obtener el usuario por su correo electrónico
        User user = userRepository.searchEmail(userEmail);

        // Verificar si el usuario existe
        if (user == null) {
            throw new OurException("Usuario no encontrado");
        }

        // Buscar el estado 'PENDING' en la tabla state_request
        StateRequest pendingState = stateRequestRepository.findByState("PENDING");

        // Verificar que el estado pendiente no sea nulo
        if (pendingState == null) {
            throw new OurException("Estado 'PENDING' no encontrado");
        }

        // Crear la solicitud del productor
        ProducerRequest producerRequest = new ProducerRequest();
        producerRequest.setUser(user);
        producerRequest.setDate(new Date());
        producerRequest.setStaterequest(pendingState);

        // Guardar la solicitud del productor
        producerRequestRepository.save(producerRequest);
    }


}
