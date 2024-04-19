package com.gardengroup.agroplantationapp.service;

import java.util.List;
import com.gardengroup.agroplantationapp.model.entity.ProducerRequest;


public interface IProducerRequestService {
    
    public List<ProducerRequest> getPendingProducerRequests();
    void approve(Long entityId);
    void reject(Long entityId);

}
