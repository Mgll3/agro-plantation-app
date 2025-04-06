package com.garden_group.forum.userIntegrationTests;

import static org.mockito.Mockito.verify;

import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.context.ActiveProfiles;

import com.garden_group.forum.GardenForumServiceApplication;
import com.garden_group.forum.application.event.UserEventListener;
import com.garden_group.forum.application.mapper.UserMapper;
import com.garden_group.forum.domain.event.user.UserCreatedEvent;
import com.garden_group.forum.domain.repository.user.UserCommandRepository;
import com.garden_group.forum.domain.repository.user.UserQueryRepository;

import lombok.AllArgsConstructor;

@ActiveProfiles("deploy")
@SpringBootTest(classes = GardenForumServiceApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class UserTest {

    @Autowired
    private ApplicationEventPublisher eventPublisher;
    @Autowired
    private UserCommandRepository userCommandRepository;

    @Test
    @DisplayName("User Created Event")
    void shouldCreateUserThroughEvent() {

        UserCreatedEvent event = new UserCreatedEvent(
                UUID.randomUUID(),
                "testUser",
                "testAddress",
                "testPassword",
                "testRole");

        eventPublisher.publishEvent(event);

        userCommandRepository.existsById(event.getId())
                .subscribe();
    }

}
