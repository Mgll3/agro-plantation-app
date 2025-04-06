package com.garden_group.forum.infraestructure.repository.query.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "forum_user")
@Data
@NoArgsConstructor
public class UserMongo {
    @Id
    private String id;
    private String username;
    private String address;
    private String password;
    private String role;
}
