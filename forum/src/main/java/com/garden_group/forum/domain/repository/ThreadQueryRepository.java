package com.garden_group.forum.domain.repository;

import com.garden_group.forum.infraestructure.repository.query.ThreadMongo;

public interface ThreadQueryRepository {
    public ThreadMongo save(ThreadMongo thread);
}
