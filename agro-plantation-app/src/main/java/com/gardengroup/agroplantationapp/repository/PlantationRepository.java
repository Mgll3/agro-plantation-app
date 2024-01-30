package com.gardengroup.agroplantationapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gardengroup.agroplantationapp.entities.Plantation;

@Repository
public interface PlantationRepository extends JpaRepository<Plantation,Long> {
    
}
