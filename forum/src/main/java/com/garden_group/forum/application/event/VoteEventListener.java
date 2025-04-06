package com.garden_group.forum.application.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.garden_group.forum.application.mapper.VoteMapper;
import com.garden_group.forum.domain.event.vote.VoteCreatedEvent;
import com.garden_group.forum.domain.event.vote.VoteDeletedEvent;
import com.garden_group.forum.domain.repository.vote.VoteQueryRepository;
import com.garden_group.forum.infraestructure.repository.query.vote.VoteMongo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class VoteEventListener {

    @Autowired
    private final VoteQueryRepository voteNoSqlRepository;
    @Autowired
    private final VoteMapper voteMapper;

    @EventListener
    public void handleVoteCreatedEvent(VoteCreatedEvent event) {

        VoteMongo vote = voteMapper.toVoteMongo(event);

        voteNoSqlRepository.save(vote)
                .doOnError(error -> log.error("Error saving Vote in Secondary DB" + error.getMessage(), error))
                .subscribe();
    }

    @EventListener
    public void handleVoteDeletedEvent(VoteDeletedEvent event) {
        voteNoSqlRepository.deleteById(event.getVoteId().toString())
                .doOnError(error -> log.error("Error deleting Vote in Secondary DB" + error.getMessage(), error))
                .subscribe();
    }
}
