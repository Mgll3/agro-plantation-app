package com.gardengroup.agroplantationapp.service.implementation;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gardengroup.agroplantationapp.model.dto.request.ProducerRequestSaveDTO;
import com.gardengroup.agroplantationapp.model.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.model.entity.UserType;
import com.gardengroup.agroplantationapp.model.repository.ProducerRequestRepository;
import com.gardengroup.agroplantationapp.model.repository.UserRepository;
import com.gardengroup.agroplantationapp.service.interfaces.IProducerRequestService;

@Service
public class ProducerRequestService implements IProducerRequestService {

    @Autowired
    private ProducerRequestRepository producerRequestRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<ProducerRequest> getPendingProducerRequests() {
        // Buscar con estado "PENDING" (1L) en la base de datos
        return producerRequestRepository.findByStaterequest(new StateRequest(1L));
    }

    @Transactional
    public void approve(Long producerRequestId) {
        // Obtener la solicitud del productor por ID
        ProducerRequest producerRequest = producerRequestRepository.findById(producerRequestId)
                .orElseThrow(() -> new RuntimeException("Solicitud del productor no encontrada"));

        // Verificar si la solicitud está en estado "PENDING"
        if (!"PENDING".equals(producerRequest.getStaterequest().getState())) {
            throw new RuntimeException("La solicitud no está en estado 'PENDING'");
        } 
        
        // Actualizar el estado de la solicitud a "ACCEPTED"
        producerRequest.setStaterequest(new StateRequest(2L));

        User user = producerRequest.getUser();

        // Cambiar el tipo de usuario a "productor" (3L)
        user.setUserType(new UserType(3L));

        // Guardar los cambios en la base de datos
        producerRequestRepository.save(producerRequest);
        userRepository.save(user);
    }

    @Transactional
    public void reject(Long producerRequestId) {
        // Obtener la solicitud del productor por ID
        ProducerRequest producerRequest = producerRequestRepository.findById(producerRequestId)
                .orElseThrow(() -> new RuntimeException("Solicitud del productor no encontrada"));

        // Verificar si la solicitud está en estado "PENDING"
        if (!"PENDING".equals(producerRequest.getStaterequest().getState())) {
            throw new IllegalStateException("La solicitud no está en estado 'PENDING'");
        } 

        // Actualizar el estado de la solicitud a "DECLINED"
        producerRequest.setStaterequest(new StateRequest(3L));

        // Guardar los cambios en la base de datos
        producerRequestRepository.save(producerRequest);
    }

    @Transactional
    public ProducerRequest sendProducerRequest(String userEmail, ProducerRequestSaveDTO producerDTO) {

        ProducerRequest producerRequest = new ProducerRequest(producerDTO);

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new DataAccessException("User not found") {
                });

        producerRequest.setUser(user);
        producerRequest.setDate(new Date());
        // Guardo el estado de la solicitud en "PENDING"
        producerRequest.setStaterequest(new StateRequest(1L));

        return producerRequestRepository.save(producerRequest);

    }

}