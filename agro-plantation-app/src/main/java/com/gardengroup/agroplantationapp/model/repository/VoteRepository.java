package com.gardengroup.agroplantationapp.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.model.entity.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote,Long>  {

    Vote findByUserEmailAndPublicationId(String userEmail, Long publicationId);

}
