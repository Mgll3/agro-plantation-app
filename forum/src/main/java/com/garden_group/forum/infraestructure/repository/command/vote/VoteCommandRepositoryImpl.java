package com.garden_group.forum.infraestructure.repository.command.vote;

import java.util.UUID;

import org.springframework.stereotype.Repository;
import com.garden_group.forum.domain.entity.Vote;
import com.garden_group.forum.domain.repository.vote.VoteCommandRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class VoteCommandRepositoryImpl implements VoteCommandRepository {

    private final VoteCommandR2dbcRepository r2dbcRepository;

    @Override
    public Mono<Vote> save(Vote vote) {
        return r2dbcRepository.save(vote);
    }

    @Override
    public Mono<Vote> findByAuthorIdAndThreadId(UUID authorId, UUID threadId) {
        return r2dbcRepository.findByAuthorIdAndThreadId(authorId, threadId);
    }

    @Override
    public Mono<Void> deleteById(UUID id) {
        return r2dbcRepository.deleteById(id);
    }

}
