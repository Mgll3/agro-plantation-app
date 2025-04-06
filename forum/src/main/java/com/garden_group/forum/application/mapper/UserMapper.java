package com.garden_group.forum.application.mapper;

import org.springframework.stereotype.Component;
import com.garden_group.forum.domain.entity.ForumUser;
import com.garden_group.forum.domain.event.user.UserCreatedEvent;
import com.garden_group.forum.infraestructure.repository.query.user.UserMongo;

@Component
public class UserMapper {

    public ForumUser toUser(UserCreatedEvent event) {
        return new ForumUser(
                event.getId(),
                event.getUsername(),
                event.getAddress(),
                event.getPassword(),
                event.getRole());
    }

    public UserMongo toUserMongo(UserCreatedEvent event) {
        UserMongo user = new UserMongo();
        user.setId(event.getId().toString());
        user.setUsername(event.getUsername());
        user.setAddress(event.getAddress());
        user.setPassword(event.getPassword());
        user.setRole(event.getRole());

        return user;
    }
}
