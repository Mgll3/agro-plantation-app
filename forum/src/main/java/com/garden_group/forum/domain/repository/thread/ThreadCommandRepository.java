package com.garden_group.forum.domain.repository.thread;

import java.util.UUID;

import com.garden_group.forum.domain.entity.Thread;

import reactor.core.publisher.Mono;

public interface ThreadCommandRepository {
    public Mono<Thread> save(Thread thread);

    public Mono<Boolean> existsById(UUID id);
}
