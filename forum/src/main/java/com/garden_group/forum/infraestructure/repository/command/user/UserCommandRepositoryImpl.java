package com.garden_group.forum.infraestructure.repository.command.user;

import java.util.UUID;

import org.springframework.stereotype.Repository;
import com.garden_group.forum.domain.entity.ForumUser;
import com.garden_group.forum.domain.repository.user.UserCommandRepository;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class UserCommandRepositoryImpl implements UserCommandRepository {

    private final UserCommandR2dbcRepository r2dbcRepository;

    @Override
    public Mono<Void> save(ForumUser user) {
        return r2dbcRepository.save(user.getId(), user.getUsername(), user.getAddress(), user.getPassword(),
                user.getRole());

    }

    @Override
    public Mono<Boolean> existsById(UUID id) {
        return r2dbcRepository.existsById(id);
    }
}
