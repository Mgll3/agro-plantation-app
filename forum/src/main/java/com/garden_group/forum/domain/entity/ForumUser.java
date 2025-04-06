package com.garden_group.forum.domain.entity;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@Table("forum_user")
@Data
@AllArgsConstructor
public class ForumUser {

    @Id
    private UUID id;
    private String username;
    private String address;
    private String password;
    private String role;

    public ForumUser(UUID id) {
        this.id = id;
    }
}
