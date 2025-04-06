package com.garden_group.forum.domain.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.garden_group.forum.domain.entity.Vote;
import com.garden_group.forum.domain.event.vote.VoteDeletedEvent;
import com.garden_group.forum.domain.repository.thread.ThreadCommandRepository;
import com.garden_group.forum.domain.repository.user.UserCommandRepository;
import com.garden_group.forum.domain.repository.vote.VoteCommandRepository;
import com.garden_group.forum.shared.utils.Constants;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class VoteCreationService {

    @Autowired
    private final VoteCommandRepository voteRepository;
    @Autowired
    private final ThreadCommandRepository threadRepository;
    @Autowired
    private final UserCommandRepository userRepository;
    @Autowired
    private final ApplicationEventPublisher eventPublisher;

    public Mono<Vote> validateVoteCreation(Mono<Vote> voteMono) {

        return voteMono.flatMap(vote -> voteRepository.findByAuthorIdAndThreadId(vote.getAuthorId(), vote.getThreadId())
                .flatMap(existingVote -> {
                    // Validate if vote already exists
                    return voteRepository.deleteById(existingVote.getId())
                            .then(Mono.fromRunnable(() -> {
                                VoteDeletedEvent event = new VoteDeletedEvent(existingVote.getId());
                                eventPublisher.publishEvent(event);
                            }))
                            .thenReturn(vote);
                })
                .switchIfEmpty(Mono.just(vote))
                .flatMap(validatedVote -> userRepository.existsById(validatedVote.getAuthorId())
                        .flatMap(userExists -> {
                            if (!userExists) {
                                return Mono.error(new IllegalArgumentException(Constants.U_NOT_FOUND));
                            }
                            return Mono.just(validatedVote);
                        }))
                .flatMap(validatedVote -> threadRepository.existsById(validatedVote.getThreadId())
                        .flatMap(threadExists -> {
                            if (!threadExists) {
                                return Mono.error(new IllegalArgumentException(Constants.T_NOT_FOUND));
                            }
                            return Mono.just(validatedVote);
                        })))
                .onErrorMap(error -> {
                    log.error("Error validating vote creation: {}", error.getMessage(), error);
                    return new IllegalArgumentException("Error validating vote creation: " + error.getMessage(), error);
                });
    }
}
