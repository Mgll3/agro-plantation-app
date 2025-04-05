package com.garden_group.forum.infraestructure.repository.command.thread;

import com.garden_group.forum.domain.entity.Thread;
import java.util.UUID;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface ThreadCommandR2dbcRepository extends R2dbcRepository<Thread, UUID> {

}
