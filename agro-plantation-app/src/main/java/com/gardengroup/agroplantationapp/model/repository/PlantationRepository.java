package com.gardengroup.agroplantationapp.model.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.model.entity.Plantation;

@Repository
public interface PlantationRepository extends JpaRepository<Plantation,Long> {
    
}
