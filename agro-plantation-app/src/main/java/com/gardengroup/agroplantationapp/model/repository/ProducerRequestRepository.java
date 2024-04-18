package com.gardengroup.agroplantationapp.model.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.model.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;

import java.util.List;


@Repository
public interface ProducerRequestRepository extends JpaRepository<ProducerRequest, Long> {
    List<ProducerRequest> findByStaterequest(StateRequest staterequest);



}
