package com.gardengroup.agroplantationapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gardengroup.agroplantationapp.entities.Publication;

@Repository
public interface PublicationRepository  extends JpaRepository<Publication,Long>{
    
}
