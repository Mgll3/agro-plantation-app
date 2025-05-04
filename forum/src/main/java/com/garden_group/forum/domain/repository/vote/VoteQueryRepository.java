package com.garden_group.forum.domain.repository.vote;

import com.garden_group.forum.application.query.SearchVoteQueryFilters;
import com.garden_group.forum.infraestructure.repository.query.vote.VoteMongo;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface VoteQueryRepository {
    public Mono<VoteMongo> save(VoteMongo vote);

    public Mono<Void> deleteById(String id);

    public Flux<VoteMongo> findByUserIdFilters(String userId, SearchVoteQueryFilters filters);

}
