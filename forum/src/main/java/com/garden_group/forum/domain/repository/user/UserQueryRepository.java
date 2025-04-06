package com.garden_group.forum.domain.repository.user;

import java.util.UUID;
import com.garden_group.forum.infraestructure.repository.query.user.UserMongo;

import reactor.core.publisher.Mono;

public interface UserQueryRepository {
    public Mono<UserMongo> save(UserMongo user);

    public Mono<UserMongo> findById(UUID id);
}
