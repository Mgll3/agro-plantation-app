package com.gardengroup.agroplantationapp.repository;


import com.gardengroup.agroplantationapp.entity.StateRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.entity.ProducerRequest;

import java.util.List;


@Repository
public interface ProducerRequestRepository extends JpaRepository<ProducerRequest, Long> {
    List<ProducerRequest> findByStaterequest(StateRequest staterequest);



}
