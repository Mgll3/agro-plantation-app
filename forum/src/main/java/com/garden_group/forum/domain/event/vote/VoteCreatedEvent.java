package com.garden_group.forum.domain.event.vote;

import java.time.LocalDateTime;
import java.util.UUID;

import com.garden_group.forum.domain.event.Event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VoteCreatedEvent extends Event {
    private final UUID id;
    private final UUID authorId;
    private final UUID threadId;
    private final Boolean isUpvote;
    private final LocalDateTime createdAt;
}
