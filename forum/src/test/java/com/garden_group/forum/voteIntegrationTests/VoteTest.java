package com.garden_group.forum.voteIntegrationTests;

import java.net.URI;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.reactive.server.WebTestClient.ResponseSpec;
import com.garden_group.forum.GardenForumServiceApplication;
import com.garden_group.forum.application.command.CreateVoteCommand;
import com.garden_group.forum.presentation.response.CreateVoteResponse;
import com.garden_group.forum.shared.utils.Constants;

import reactor.core.publisher.Mono;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ActiveProfiles("Deploy")
@SpringBootTest(classes = GardenForumServiceApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class VoteTest {

    @Autowired
    private WebTestClient client;

    @Test
    @DisplayName("Create Vote")
    void shouldCreateVote() {

        URI createVoteUrl = URI.create("/api/v1/votes/create");

        CreateVoteCommand createVoteCommand = new CreateVoteCommand(
                UUID.fromString("2e8e8b8e-8e8e-8e8e-8e8e-8e8e8e8e8e8e"),
                UUID.fromString("5a1cfe92-5eb0-41f2-905a-f66b974d5e05"),
                true);

        final ResponseSpec clientResponse = client.post()
                .uri(createVoteUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(createVoteCommand), CreateVoteCommand.class)
                .exchange();

        clientResponse.expectStatus().isCreated()
                .expectBody(CreateVoteResponse.class)
                .consumeWith(response -> {
                    CreateVoteResponse voteResponse = response.getResponseBody();
                    assertNotNull(voteResponse.getVoteId(), "Vote ID should not be null");
                    assertEquals(Constants.V_CREATED, voteResponse.getMessage());
                });

    }
}
