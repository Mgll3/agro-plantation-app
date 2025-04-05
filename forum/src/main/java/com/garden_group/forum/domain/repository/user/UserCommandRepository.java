package com.garden_group.forum.domain.repository.user;

import java.util.UUID;
import reactor.core.publisher.Mono;

public interface UserCommandRepository {
    public Mono<Boolean> existsById(UUID id);
}
