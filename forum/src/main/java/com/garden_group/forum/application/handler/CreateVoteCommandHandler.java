package com.garden_group.forum.application.handler;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.garden_group.forum.application.command.CreateVoteCommand;
import com.garden_group.forum.application.mapper.VoteMapper;
import com.garden_group.forum.domain.event.vote.VoteCreatedEvent;
import com.garden_group.forum.domain.repository.vote.VoteCommandRepository;
import com.garden_group.forum.domain.services.VoteCreationService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class CreateVoteCommandHandler {

    @Autowired
    private final VoteCommandRepository voteRepository;
    @Autowired
    private final VoteMapper voteMapper;
    @Autowired
    private final VoteCreationService voteCreationService;
    @Autowired
    private final ApplicationEventPublisher eventPublisher;

    public Mono<UUID> handle(Mono<CreateVoteCommand> command) {
        return command
                .map(voteMapper::toEntity)
                .map(voteCreationService::validateVoteCreation)
                .flatMap(voteRepository::save)
                .flatMap(savedVote -> {
                    VoteCreatedEvent event = voteMapper.toVoteCreatedEvent(savedVote);
                    return Mono.fromRunnable(() -> eventPublisher.publishEvent(event))
                            .thenReturn(savedVote.getId());
                });
    }
}
