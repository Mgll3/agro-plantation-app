package com.garden_group.forum.threadIntegrationTests;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.reactive.server.WebTestClient.ResponseSpec;
import org.springframework.http.MediaType;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import com.garden_group.forum.GardenForumServiceApplication;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.presentation.dto.CreateThreadResponse;
import com.garden_group.forum.shared.utils.Constants;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@ActiveProfiles("deploy")
@SpringBootTest(classes = GardenForumServiceApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class ThreadTest {

    @Autowired
    private WebTestClient client;

    CreateThreadCommand createThreadCommand = new CreateThreadCommand(
            "Test Thread 1", "This is a test thread 1.",
            UUID.fromString("2e8e8b8e-8e8e-8e8e-8e8e-8e8e8e8e8e8e"), true);

    @Test
    @DisplayName("Create Thread")
    void shouldCreateThreat() {

        URI createThreadUrl = URI.create("/api/v1/threads/create");

        final ResponseSpec clienteResponse = client.post()
                .uri(createThreadUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Mono.just(createThreadCommand), CreateThreadCommand.class)
                .exchange();

        clienteResponse.expectStatus().isCreated()
                .expectBody(CreateThreadResponse.class)
                .consumeWith(response -> {
                    CreateThreadResponse threadResponse = response.getResponseBody();
                    assertNotNull(threadResponse.getThreadId(), "Thread ID should not be null");
                    assertEquals(Constants.T_CREATED, threadResponse.getMessage());
                });
    }

    @Test
    @DisplayName("Create Multiple Threads")
    void shouldCreateMultipleThreads() {

        URI createThreadUrl = URI.create("/api/v1/threads/bulk-create");

        CreateThreadCommand createThreadCommand2 = new CreateThreadCommand(
                "Test Thread 2", "This is a test thread 2.",
                UUID.fromString("3f9f9f9f-9f9f-9f9f-9f9f-9f9f9f9f9f9f"), true);

        Flux<CreateThreadCommand> createThreadCommands = Flux.just(
                createThreadCommand, createThreadCommand2);

        final ResponseSpec clienteResponse = client.post()
                .uri(createThreadUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(createThreadCommands, CreateThreadCommand.class)
                .exchange();

        clienteResponse.expectStatus().isCreated()
                .expectBodyList(CreateThreadResponse.class)
                .consumeWith(response -> {
                    List<CreateThreadResponse> threadResponses = response.getResponseBody();
                    assertNotNull(threadResponses, "Response Body should not be null");
                    assertEquals(2, threadResponses.size(), "Should create 2 threads");

                    threadResponses.forEach(threadResponse -> {
                        assertNotNull(threadResponse.getThreadId(), "Thread ID should not be null");
                        assertEquals(Constants.T_CREATED, threadResponse.getMessage());
                    });
                });

    }

}
