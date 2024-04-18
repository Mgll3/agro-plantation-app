package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.model.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.model.entity.UserType;
import com.gardengroup.agroplantationapp.model.repository.ProducerRequestRepository;
import com.gardengroup.agroplantationapp.model.repository.StateRequestRepository;
import com.gardengroup.agroplantationapp.model.repository.UserRepository;
import com.gardengroup.agroplantationapp.model.repository.UserTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class AdminService implements Approvable{
    @Autowired
    private ProducerRequestRepository producerRequestRepository;
    @Autowired
    StateRequestRepository stateRequestRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserTypeRepository userTypeRepository;

    @Transactional(readOnly = true)
    public List<ProducerRequest> getPendingProducerRequests() {
        StateRequest pendingState = stateRequestRepository.findByState("PENDING").orElse(null);
        return producerRequestRepository.findByStaterequest(pendingState);
    }

    @Transactional
    public void approve(Long producerRequestId) {
        // Obtener la solicitud del productor por ID
        ProducerRequest producerRequest = producerRequestRepository.findById(producerRequestId)
                .orElseThrow(() -> new RuntimeException("Solicitud del productor no encontrada"));

        // Verificar si la solicitud está en estado "PENDING"
        if ("PENDING".equals(producerRequest.getStaterequest().getState())) {
            // Obtener el estado "ACCEPTED" directamente
            StateRequest acceptedState = stateRequestRepository.findByState("ACCEPTED")
                    .orElseThrow(() -> new RuntimeException("Estado 'ACCEPTED' no encontrado en la base de datos"));

            // Actualizar el estado de la solicitud a "ACCEPTED"
            producerRequest.setStaterequest(acceptedState);

            User user = producerRequest.getUser();

            // Obtener el objeto UserType correspondiente al tipo "productor"
            UserType productorUserType = userTypeRepository.findByType("PRODUCER")
                    .orElseThrow(() -> new RuntimeException("Tipo de usuario 'productor' no encontrado en la base de datos"));

            // Cambiar el tipo de usuario a "productor"
            user.setUserType(productorUserType);

            // Guardar los cambios en la base de datos
            producerRequestRepository.save(producerRequest);
            userRepository.save(user);

        } else {
            throw new RuntimeException("La solicitud no está en estado 'PENDING'");
        }
    }





    @Transactional
    public void reject(Long producerRequestId) {
        // Obtener la solicitud del productor por ID
        ProducerRequest producerRequest = producerRequestRepository.findById(producerRequestId)
                .orElseThrow(() -> new RuntimeException("Solicitud del productor no encontrada"));

        // Verificar si la solicitud está en estado "PENDING"
        if ("PENDING".equals(producerRequest.getStaterequest().getState())) {
            // Obtener el estado "DECLINED" directamente
            StateRequest declinedState = stateRequestRepository.findByState("DECLINED").orElse(null);

            // Verificar si el estado "DECLINED" existe
            if (declinedState != null) {
                // Actualizar el estado de la solicitud a "DECLINED"
                producerRequest.setStaterequest(declinedState);

                // Guardar los cambios en la base de datos
                producerRequestRepository.save(producerRequest);
            } else {
                throw new RuntimeException("Estado 'DECLINED' no encontrado en la base de datos");
            }

        } else {
            throw new IllegalStateException("La solicitud no está en estado 'PENDING'");
        }
    }



}
