package com.garden_group.forum.infraestructure.repository.command.thread;

import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.garden_group.forum.domain.entity.Thread;
import com.garden_group.forum.domain.repository.thread.ThreadCommandRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class ThreadCommandRepositoryImpl implements ThreadCommandRepository {

    private final ThreadCommandR2dbcRepository r2dbcRepository;

    @Override
    public Mono<Thread> save(Thread thread) {
        return r2dbcRepository.save(thread);
    }

    @Override
    public Mono<Boolean> existsById(UUID id) {
        return r2dbcRepository.existsById(id);
    }

}
