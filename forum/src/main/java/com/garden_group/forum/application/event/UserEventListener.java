package com.garden_group.forum.application.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.garden_group.forum.application.mapper.UserMapper;
import com.garden_group.forum.domain.entity.ForumUser;
import com.garden_group.forum.domain.event.user.UserCreatedEvent;
import com.garden_group.forum.domain.repository.user.UserCommandRepository;
import com.garden_group.forum.domain.repository.user.UserQueryRepository;
import com.garden_group.forum.infraestructure.repository.query.user.UserMongo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserEventListener {

    @Autowired
    private final UserCommandRepository userCommandRepository;
    @Autowired
    private final UserQueryRepository userNoSqlRepository;
    @Autowired
    private final UserMapper userMapper;

    @EventListener
    public void handleUserCreatedEvent(UserCreatedEvent event) {

        userCommandRepository.existsById(event.getId())
                .doOnNext(exists -> {
                    if (exists) {
                        log.warn("User with ID {} already exists in primary DB", event.getId());
                    }
                })
                .subscribe();

        ForumUser userToSave = userMapper.toUser(event);
        userCommandRepository.save(userToSave)
                .doOnError(error -> log.error("Error saving User in primary DB" + error.getMessage(), error))
                .subscribe();

        UserMongo userMongo = userMapper.toUserMongo(event);
        userNoSqlRepository.save(userMongo)
                .doOnError(error -> log.error("Error saving User in Secondary DB" + error.getMessage(), error))
                .subscribe();
    }

}
