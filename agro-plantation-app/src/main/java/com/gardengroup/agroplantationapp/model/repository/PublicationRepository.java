package com.gardengroup.agroplantationapp.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.model.entity.Publication;

import jakarta.transaction.Transactional;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {

    List<Publication> findByAuthorId(Long id);

    List<Publication> findTop6ByOrderByScoreDesc();

    @Query("SELECT p FROM Publication p WHERE p.author.email = :email ")
    List<Publication> publicationsByEmail(@Param("email") String email);

    @Query("SELECT p FROM Publication p WHERE p.authorizationStatus.state = 'PENDING'")
    List<Publication> findAllPendingPublications();

    @Query(value = "SELECT * FROM publication p ORDER BY score DESC LIMIT :pagination, :pagTop", nativeQuery = true)
    List<Publication> publicationsBylike(@Param("pagination") int pagination, @Param("pagTop") int pagTop);

    @Query(value = "SELECT * FROM publication p ORDER BY author_id DESC LIMIT :pagination, :pagTop", nativeQuery = true)
    List<Publication> publicationsByUser(@Param("pagination") int pagination, @Param("pagTop") int pagTop);

    @Query(value = "SELECT * FROM publication p ORDER BY publication_date DESC LIMIT :pagination, :pagTop", nativeQuery = true)
    List<Publication> publicationsByDate(@Param("pagination") int pagination, @Param("pagTop") int pagTop);

    @Query(value = "SELECT * FROM publication p ORDER BY RAND() DESC LIMIT :pagination, :pagTop", nativeQuery = true)
    List<Publication> publicationsByAleatory(@Param("pagination") int pagination, @Param("pagTop") int pagTop);

    @Query(value = "SELECT * FROM publication p WHERE authorization_status_id = 1 ORDER BY publication_date DESC LIMIT :pagination, :pagTop", nativeQuery = true)
    List<Publication> publicationsByPending(@Param("pagination") int pagination, @Param("pagTop") int pagTop);

    @Query(value = "SELECT COUNT(*) FROM publication WHERE authorization_status_id = 1", nativeQuery = true)
    int countPublicationsByPending();

    @Query(value = "SELECT * FROM publication ORDER BY COUNT(*) OVER (PARTITION BY author_id) DESC, author_id LIMIT :pagination, :pagTop", nativeQuery = true)
    List<Publication> publicationsByQuantity(@Param("pagination") int pagination, @Param("pagTop") int pagTop);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM publication WHERE author_id = :id", nativeQuery = true)
    void deleteAllByAuthorId(@Param("id") Long id);
}
