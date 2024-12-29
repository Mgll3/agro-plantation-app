package com.garden_group.forum.infraestructure.repository.command;

import org.springframework.stereotype.Repository;

import com.garden_group.forum.domain.repository.ThreadCommandRepository;
import com.garden_group.forum.domain.entity.Thread;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ThreadCommandRepositoryImpl implements ThreadCommandRepository {

    private final ThreadCommandJpaRepository jpaRepository;

    @Override
    public Thread save(Thread thread) {
        return jpaRepository.save(thread);
    }

}
