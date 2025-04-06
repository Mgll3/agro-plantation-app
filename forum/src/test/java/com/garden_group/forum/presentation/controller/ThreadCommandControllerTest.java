package com.garden_group.forum.presentation.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.net.URI;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.reactive.server.WebTestClient.ResponseSpec;

import com.garden_group.forum.presentation.controller.command.ThreadCommandController;
import com.garden_group.forum.presentation.dto.CreateThreadResponse;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.application.handler.CreateThreadCommandHandler;
import com.garden_group.forum.domain.repository.thread.ThreadCommandRepository;
import com.garden_group.forum.infraestructure.repository.command.thread.ThreadCommandR2dbcRepository;
import com.garden_group.forum.infraestructure.repository.command.thread.ThreadCommandRepositoryImpl;

import org.mockito.ArgumentCaptor;
import reactor.core.publisher.Mono;

@ActiveProfiles("Deploy")
@WebFluxTest(ThreadCommandController.class)
class ThreadCommandControllerTest {

        private ThreadCommandController threadCommandController;

        @MockBean
        private CreateThreadCommandHandler createThreadCommandHandler;

        @MockBean
        private ThreadCommandRepository threadRepository;

        @MockBean
        private ThreadCommandR2dbcRepository threadCommandR2dbcRepository;

        @MockBean
        private ThreadCommandRepositoryImpl threadCommandRepositoryImpl;

        @Autowired
        private WebTestClient client;

        // @Test
        void shouldCreateThread() {

                URI createThreadUrl = URI.create("/api/v1/threads/create");

                CreateThreadCommand createCommand = new CreateThreadCommand("Test Thread", "This is a test thread.",
                                UUID.fromString("2e8e8b8e-8e8e-8e8e-8e8e-8e8e8e8e8e8e"), true);

                when(createThreadCommandHandler.handle(any()))
                                .thenReturn(Mono.just(UUID.randomUUID()));

                final ResponseSpec clientResponse = client.post()
                                .uri(createThreadUrl)
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(Mono.just(createCommand), CreateThreadCommand.class)
                                .exchange();

                clientResponse.expectStatus().isCreated()
                                .expectBody(CreateThreadResponse.class)
                                .consumeWith(response -> {
                                        CreateThreadResponse threadResponse = response.getResponseBody();
                                        assertEquals("Thread created successfully", threadResponse.getMessage());
                                        assertNotNull(threadResponse.getThreadId(), "Thread ID should not be null");
                                });

                ArgumentCaptor<Mono<CreateThreadCommand>> captor = ArgumentCaptor.forClass(Mono.class);

                verify(createThreadCommandHandler, times(1)).handle(captor.capture());

                CreateThreadCommand capturedCommand = captor.getValue().block();
                assertEquals(createCommand, capturedCommand);

        }
}
