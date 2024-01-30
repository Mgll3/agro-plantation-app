package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entities.StateRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRequestRepository extends JpaRepository<StateRequest,Long> {
}
