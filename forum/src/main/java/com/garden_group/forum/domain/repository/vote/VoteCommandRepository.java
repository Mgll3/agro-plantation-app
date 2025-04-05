package com.garden_group.forum.domain.repository.vote;

import java.util.UUID;
import com.garden_group.forum.domain.entity.Vote;
import reactor.core.publisher.Mono;

public interface VoteCommandRepository {
    public Mono<Vote> save(Vote vote);

    public Mono<Vote> findByAuthorIdAndThreadId(UUID authorId, UUID threadId);

    public Mono<Void> deleteById(UUID id);

}
