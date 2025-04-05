package com.garden_group.forum.infraestructure.repository.query.thread;

import org.springframework.stereotype.Repository;

import com.garden_group.forum.domain.repository.thread.ThreadQueryRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class ThreadQueryRepositoryImpl implements ThreadQueryRepository {

    private final ThreadQueryNoSqlRepository noSqlRepository;

    @Override
    public Mono<ThreadMongo> save(ThreadMongo thread) {
        return noSqlRepository.save(thread);
    }
}
