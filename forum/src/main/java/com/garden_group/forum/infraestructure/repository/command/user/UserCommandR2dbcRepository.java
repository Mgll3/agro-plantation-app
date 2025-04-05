package com.garden_group.forum.infraestructure.repository.command.user;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.R2dbcRepository;

import com.garden_group.forum.domain.entity.ForumUser;

public interface UserCommandR2dbcRepository extends R2dbcRepository<ForumUser, UUID> {

}
