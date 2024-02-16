package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entities.StateRequest;
import com.gardengroup.agroplantationapp.enumerations.AuthorizationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StateRequestRepository extends JpaRepository<StateRequest,Long> {

}
