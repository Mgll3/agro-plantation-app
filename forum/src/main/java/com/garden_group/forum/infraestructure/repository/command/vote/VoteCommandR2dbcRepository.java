package com.garden_group.forum.infraestructure.repository.command.vote;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.Param;

import com.garden_group.forum.domain.entity.Vote;

import reactor.core.publisher.Mono;

public interface VoteCommandR2dbcRepository extends R2dbcRepository<Vote, UUID> {

    @Query("SELECT * FROM vote WHERE author_id = :authorId AND thread_id = :threadId")
    public Mono<Vote> findByAuthorIdAndThreadId(@Param("authorId") UUID authorId,
            @Param("threadId") UUID threadId);
}
