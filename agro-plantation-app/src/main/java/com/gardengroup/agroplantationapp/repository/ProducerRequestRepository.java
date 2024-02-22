package com.gardengroup.agroplantationapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.entity.ProducerRequest;

@Repository
public interface ProducerRequestRepository extends JpaRepository<ProducerRequest, Long> {
}
