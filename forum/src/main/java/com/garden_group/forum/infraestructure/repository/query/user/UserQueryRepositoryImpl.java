package com.garden_group.forum.infraestructure.repository.query.user;

import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.garden_group.forum.domain.repository.user.UserQueryRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class UserQueryRepositoryImpl implements UserQueryRepository {

    private final UserQueryNoSqlRepository noSqlRepository;

    @Override
    public Mono<UserMongo> save(UserMongo user) {
        return noSqlRepository.save(user);
    }

    @Override
    public Mono<UserMongo> findById(UUID id) {
        return noSqlRepository.findById(id.toString());
    }

}
