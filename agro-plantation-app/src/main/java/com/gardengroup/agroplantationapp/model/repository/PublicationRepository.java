package com.gardengroup.agroplantationapp.model.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.model.entity.Publication;


@Repository
public interface PublicationRepository  extends JpaRepository<Publication,Long>{

    List<Publication> findByAuthorId(Long id);
    List<Publication> findTop6ByOrderByScoreDesc();

    @Query("SELECT p FROM Publication p WHERE p.author.email = :email ")
    List<Publication> publicationsByEmail(@Param("email") String email);

    @Query("SELECT p FROM Publication p WHERE p.authorizationStatus.state = 'PENDING'")
    List<Publication> findAllPendingPublications();

    @Query(value = "SELECT * FROM Publication p ORDER BY score DESC LIMIT :pagination, :pagTop", nativeQuery = true)
    List<Publication> publicationsBylike(@Param("pagination") int pagination, @Param("pagTop") int pagTop);
    
}
