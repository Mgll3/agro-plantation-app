package com.garden_group.forum.domain.repository;

import com.garden_group.forum.domain.entity.Thread;

import reactor.core.publisher.Mono;

public interface ThreadCommandRepository {
    public Mono<Thread> save(Thread thread);
}
