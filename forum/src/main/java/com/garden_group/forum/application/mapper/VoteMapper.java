package com.garden_group.forum.application.mapper;

import org.springframework.stereotype.Component;

import com.garden_group.forum.application.command.CreateVoteCommand;
import com.garden_group.forum.domain.entity.Vote;
import com.garden_group.forum.domain.event.vote.VoteCreatedEvent;
import com.garden_group.forum.infraestructure.repository.query.vote.VoteMongo;
import com.garden_group.forum.presentation.response.VoteResponse;

@Component
public class VoteMapper {

    public Vote toEntity(CreateVoteCommand command) {
        return new Vote(
                command.getThreadId(),
                command.getUserId(),
                command.getIsUpvote());
    }

    public VoteCreatedEvent toVoteCreatedEvent(Vote vote) {
        return new VoteCreatedEvent(
                vote.getId(),
                vote.getThreadId(),
                vote.getAuthorId(),
                vote.getIsUpvote(),
                vote.getCreatedAt());
    }

    public VoteMongo toVoteMongo(VoteCreatedEvent event) {
        VoteMongo vote = new VoteMongo();
        vote.setId(event.getId());
        vote.setThreadId(event.getThreadId());
        vote.setAuthorId(event.getAuthorId());
        vote.setIsUpvote(event.getIsUpvote());
        vote.setCreatedAt(event.getCreatedAt());

        return vote;
    }

    public VoteResponse toResponse(Vote vote) {
        return new VoteResponse(
                vote.getId(),
                vote.getThreadId(),
                vote.getAuthorId(),
                vote.getIsUpvote());
    }

    public VoteResponse toVoteResponse(VoteMongo vote) {
        return new VoteResponse(
                vote.getId(),
                vote.getThreadId(),
                vote.getAuthorId(),
                vote.getIsUpvote());
    }

}
