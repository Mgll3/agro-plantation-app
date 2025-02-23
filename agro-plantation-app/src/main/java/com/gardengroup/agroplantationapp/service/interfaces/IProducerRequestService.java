package com.gardengroup.agroplantationapp.service.interfaces;

import java.util.List;
import com.gardengroup.agroplantationapp.model.dto.request.ProducerRequestSaveDTO;
import com.gardengroup.agroplantationapp.model.entity.ProducerRequest;

public interface IProducerRequestService {

    public List<ProducerRequest> getPendingProducerRequests();

    void approve(Long entityId);

    void reject(Long entityId);

    public ProducerRequest sendProducerRequest(String userEmail, ProducerRequestSaveDTO producerRequest);

}
