package com.gardengroup.agroplantationapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.entities.Publication;

@Repository
public interface PublicationRepository  extends JpaRepository<Publication,Long>{
    
    List<Publication> findByAuthorId(Long id);

    @Query("SELECT p FROM Publication p WHERE p.author.email = :email")
    List<Publication> publicationsByEmail(@Param("email") String email);
}
