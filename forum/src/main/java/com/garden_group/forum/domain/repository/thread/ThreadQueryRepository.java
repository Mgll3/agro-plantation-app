package com.garden_group.forum.domain.repository.thread;

import com.garden_group.forum.infraestructure.repository.query.thread.ThreadMongo;

import reactor.core.publisher.Mono;

public interface ThreadQueryRepository {
    public Mono<ThreadMongo> save(ThreadMongo thread);
}
