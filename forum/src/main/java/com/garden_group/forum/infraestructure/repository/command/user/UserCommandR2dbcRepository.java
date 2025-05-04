package com.garden_group.forum.infraestructure.repository.command.user;

import java.util.UUID;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.Param;
import com.garden_group.forum.domain.entity.ForumUser;
import reactor.core.publisher.Mono;

public interface UserCommandR2dbcRepository extends R2dbcRepository<ForumUser, UUID> {

        @Query("INSERT INTO forum_user (id, username, address, password, role) " +
                        "VALUES (:id, :username, :address, :password, :role) ")
        public Mono<Void> save(@Param("id") UUID id,
                        @Param("username") String username,
                        @Param("address") String address,
                        @Param("password") String password,
                        @Param("role") String role);
}
