package com.garden_group.forum.application.handler;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import com.garden_group.forum.domain.entity.Thread;
import com.garden_group.forum.domain.repository.thread.ThreadCommandRepository;

import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.context.ActiveProfiles;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.application.mapper.ThreadMapper;
import com.garden_group.forum.infraestructure.repository.command.thread.ThreadCommandR2dbcRepository;
import reactor.core.publisher.Mono;

@ActiveProfiles("Deploy")
@WebFluxTest(CreateThreadCommandHandler.class)
class CreateThreadCommandHandlerTest {

        @InjectMocks
        private CreateThreadCommandHandler createThreadCommandHandler;

        @MockBean
        private ThreadMapper threadMapper;

        @MockBean
        private ThreadCommandRepository threadRepository;

        @MockBean
        private ThreadCommandR2dbcRepository threadCommandR2dbcRepository;

        @MockBean
        private ApplicationEventPublisher eventPublisher;

        // @Test
        void shouldCreateThread() {

                CreateThreadCommand createCommand = new CreateThreadCommand("Test Thread", "This is a test thread.",
                                UUID.fromString("2e8e8b8e-8e8e-8e8e-8e8e-8e8e8e8e8e8e"), true);

                Thread thread = new Thread();
                thread.updateTitle(createCommand.getTitle());
                thread.updateContent(createCommand.getContent());
                thread.setVisibility(createCommand.getIsVisible());
                thread.setAuthorId(createCommand.getAuthorId());

                when(threadRepository.save(any()))
                                .thenReturn(Mono.just(thread));

                when(threadMapper.toEntity(any()))
                                .thenReturn(thread);

                createThreadCommandHandler.handle(Mono.just(createCommand))
                                .subscribe(threadId -> {
                                        // Verify that the thread was created successfully
                                        assertNotNull(threadId);
                                });

        }
}
