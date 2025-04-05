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

@Service
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

    public Vote validateVoteCreation(Vote vote) {
        // Validate if User had already voted
        voteRepository.findByAuthorIdAndThreadId(vote.getAuthorId(), vote.getThreadId())
                .subscribe(existingVote -> {
                    if (existingVote != null) {
                        voteRepository.deleteById(existingVote.getId()).subscribe();
                        VoteDeletedEvent event = new VoteDeletedEvent(existingVote.getId());
                        eventPublisher.publishEvent(event);
                    }
                });

        userRepository.existsById(vote.getAuthorId()).subscribe(userExists -> {
            if (!userExists) {
                throw new IllegalArgumentException(Constants.U_NOT_FOUND);
            }
        });
        threadRepository.existsById(vote.getThreadId()).subscribe(threadExists -> {
            if (!threadExists) {
                throw new IllegalArgumentException(Constants.T_NOT_FOUND);
            }
        });

        return vote;
    }
}
