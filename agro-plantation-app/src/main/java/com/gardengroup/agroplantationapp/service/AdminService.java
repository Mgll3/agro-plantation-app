package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.entity.StateRequest;

import com.gardengroup.agroplantationapp.entity.User;
import com.gardengroup.agroplantationapp.entity.UserType;
import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.repository.ProducerRequestRepository;

import com.gardengroup.agroplantationapp.repository.StateRequestRepository;
import com.gardengroup.agroplantationapp.repository.UserRepository;
import com.gardengroup.agroplantationapp.repository.UserTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class AdminService {
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
        // Obtener el estado pendiente directamente (sin Optional)
        StateRequest pendingState = stateRequestRepository.findByState("PENDING").orElse(null);

        // Llamar al repositorio con el StateRequest
        return producerRequestRepository.findByStaterequest(pendingState);
    }

    @Transactional
    public void approveProducerRequest(Long producerRequestId) throws OurException {
        // Obtener la solicitud del productor por ID
        ProducerRequest producerRequest = producerRequestRepository.findById(producerRequestId)
                .orElseThrow(() -> new OurException("Solicitud del productor no encontrada"));

        // Verificar si la solicitud está en estado "PENDING"
        if ("PENDING".equals(producerRequest.getStaterequest().getState())) {
            // Obtener el estado "ACCEPTED" directamente
            StateRequest acceptedState = stateRequestRepository.findByState("ACCEPTED")
                    .orElseThrow(() -> new OurException("Estado 'ACCEPTED' no encontrado en la base de datos"));

            // Actualizar el estado de la solicitud a "ACCEPTED"
            producerRequest.setStaterequest(acceptedState);

            User user = producerRequest.getUser();

            // Obtener el objeto UserType correspondiente al tipo "productor"
            UserType productorUserType = userTypeRepository.findByType("PRODUCER")
                    .orElseThrow(() -> new OurException("Tipo de usuario 'productor' no encontrado en la base de datos"));

            // Cambiar el tipo de usuario a "productor"
            user.setUserType(productorUserType);

            // Guardar los cambios en la base de datos
            producerRequestRepository.save(producerRequest);
            userRepository.save(user);

            // Puedes realizar otras operaciones relacionadas con la aprobación aquí si es necesario
        } else {
            throw new OurException("La solicitud no está en estado 'PENDING'");
        }
    }


    @Transactional
    public void rejectProducerRequest(Long producerRequestId) throws OurException {
        // Obtener la solicitud del productor por ID
        ProducerRequest producerRequest = producerRequestRepository.findById(producerRequestId)
                .orElseThrow(() -> new OurException("Solicitud del productor no encontrada"));

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
            }

            // Puedes realizar otras operaciones relacionadas con el rechazo aquí si es necesario
        } else {
            throw new OurException("La solicitud no está en estado 'PENDING'");
        }
    }
}
