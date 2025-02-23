package com.garden_group.forum.infraestructure.repository.query;

import org.springframework.stereotype.Repository;
import lombok.RequiredArgsConstructor;
import com.garden_group.forum.domain.repository.ThreadQueryRepository;

@Repository
@RequiredArgsConstructor
public class ThreadQueryRepositoryImpl implements ThreadQueryRepository {

    private final ThreadQueryNoSqlRepository noSqlRepository;

    @Override
    public ThreadMongo save(ThreadMongo thread) {
        return noSqlRepository.save(thread);
    }
}
