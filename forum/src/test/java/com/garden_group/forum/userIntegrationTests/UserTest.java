package com.garden_group.forum.userIntegrationTests;

import java.time.Duration;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.context.ActiveProfiles;
import com.garden_group.forum.GardenForumServiceApplication;
import com.garden_group.forum.domain.event.user.UserCreatedEvent;
import com.garden_group.forum.domain.repository.user.UserCommandRepository;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.assertTrue;

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
    void shouldCreateUserThroughEvent() throws InterruptedException {

        UserCreatedEvent event = new UserCreatedEvent(
                UUID.randomUUID(),
                "testUser",
                "testAddress",
                "testPassword",
                "USER");

        eventPublisher.publishEvent(event);

        StepVerifier.create(
                Mono.delay(Duration.ofSeconds(8)) // Wait for the event to be processed
                        .then(userCommandRepository.existsById(event.getId())))
                .expectNext(true)
                .verifyComplete();

    }

}
