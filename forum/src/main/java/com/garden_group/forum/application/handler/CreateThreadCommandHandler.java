package com.garden_group.forum.application.handler;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.application.mapper.ThreadMapper;
import com.garden_group.forum.domain.event.thread.ThreadCreatedEvent;
import com.garden_group.forum.domain.repository.thread.ThreadCommandRepository;
import com.garden_group.forum.domain.services.ThreadCreationService;
import reactor.core.publisher.Flux;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CreateThreadCommandHandler {

    @Autowired
    private final ThreadCommandRepository threadRepository;
    @Autowired
    private final ThreadMapper threadMapper;
    @Autowired
    private final ThreadCreationService threadCreationService;
    @Autowired
    private final ApplicationEventPublisher eventPublisher;

    public Mono<UUID> handle(Mono<CreateThreadCommand> command) {

        return command
                .map(threadMapper::toEntity)
                .flatMap(thread -> threadCreationService.validateThreadCreation(Mono.just(thread)))
                .flatMap(threadRepository::save)
                .flatMap(savedThread -> {
                    ThreadCreatedEvent event = threadMapper.toThreadCreatedEvent(savedThread);
                    return Mono.fromRunnable(() -> eventPublisher.publishEvent(event))
                            .thenReturn(savedThread.getId());
                });
    }

    public Flux<UUID> handleBatch(Flux<CreateThreadCommand> commands) {
        return commands
                .map(threadMapper::toEntity)
                .flatMap(thread -> threadCreationService.validateThreadCreation(Mono.just(thread)))
                .flatMap(threadRepository::save)
                .flatMap(savedThread -> {
                    ThreadCreatedEvent event = threadMapper.toThreadCreatedEvent(savedThread);
                    return Mono.fromRunnable(() -> eventPublisher.publishEvent(event))
                            .thenReturn(savedThread.getId());
                });
    }
}
