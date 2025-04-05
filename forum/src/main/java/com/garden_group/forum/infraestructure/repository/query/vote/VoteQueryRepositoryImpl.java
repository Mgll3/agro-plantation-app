package com.garden_group.forum.infraestructure.repository.query.vote;

import org.springframework.stereotype.Repository;

import com.garden_group.forum.domain.repository.vote.VoteQueryRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class VoteQueryRepositoryImpl implements VoteQueryRepository {

    private final VoteQueryNoSqlRepository noSqlRepository;

    @Override
    public Mono<VoteMongo> save(VoteMongo vote) {
        return noSqlRepository.save(vote);
    }

    @Override
    public Mono<Void> deleteById(String id) {
        return noSqlRepository.deleteById(id);
    }
}
