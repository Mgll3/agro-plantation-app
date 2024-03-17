package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote,Long>  {

    Vote findByUserEmailAndPublicationId(String userEmail, Long publicationId);

}
