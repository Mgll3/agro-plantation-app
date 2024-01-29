package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entities.ProducerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProducerRequestRepository extends JpaRepository<ProducerRequest, Long> {
}
