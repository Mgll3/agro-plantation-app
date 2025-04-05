package com.garden_group.forum.domain.repository.vote;

import com.garden_group.forum.infraestructure.repository.query.vote.VoteMongo;

import reactor.core.publisher.Mono;

public interface VoteQueryRepository {
    public Mono<VoteMongo> save(VoteMongo vote);

    public Mono<Void> deleteById(String id);
}
