package com.gardengroup.agroplantationapp.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;
import java.util.Optional;

@Repository
public interface StateRequestRepository extends JpaRepository<StateRequest, Long> {

    Optional<StateRequest> findByState(String state);

}
