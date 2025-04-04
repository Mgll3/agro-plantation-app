package com.garden_group.forum.infraestructure.repository.command;

import org.springframework.stereotype.Repository;
import com.garden_group.forum.domain.repository.ThreadCommandRepository;
import com.garden_group.forum.domain.entity.Thread;
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

}
