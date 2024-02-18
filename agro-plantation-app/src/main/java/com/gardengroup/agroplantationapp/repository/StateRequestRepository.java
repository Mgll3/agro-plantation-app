package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entities.StateRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StateRequestRepository extends JpaRepository<StateRequest, Long> {
    @Query("SELECT sr FROM StateRequest sr WHERE sr.state = :state")
    StateRequest findByState(@Param("state") String state);
}
