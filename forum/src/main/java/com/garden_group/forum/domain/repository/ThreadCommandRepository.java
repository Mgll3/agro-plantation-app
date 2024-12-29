package com.garden_group.forum.domain.repository;

import com.garden_group.forum.domain.entity.Thread;

public interface ThreadCommandRepository {
    public Thread save(Thread thread);
}
