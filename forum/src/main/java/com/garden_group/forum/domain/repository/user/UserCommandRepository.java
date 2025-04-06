package com.garden_group.forum.domain.repository.user;

import java.util.UUID;

import com.garden_group.forum.domain.entity.ForumUser;

import reactor.core.publisher.Mono;

public interface UserCommandRepository {
    public Mono<Void> save(ForumUser user);

    public Mono<Boolean> existsById(UUID id);
}
