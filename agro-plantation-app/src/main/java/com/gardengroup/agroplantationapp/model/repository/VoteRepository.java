package com.gardengroup.agroplantationapp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.gardengroup.agroplantationapp.model.entity.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {

    Vote findByUserEmailAndPublicationId(String userEmail, Long publicationId);

    @Query(value = "SELECT * FROM vote v WHERE user_id = :user AND publication_id = :publicationId", nativeQuery = true)
    public Optional<Vote> findByUserAndPublication(Long user, Long publicationId);

}
