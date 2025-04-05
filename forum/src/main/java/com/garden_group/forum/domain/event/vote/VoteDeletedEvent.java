package com.garden_group.forum.domain.event.vote;

import java.util.UUID;

import com.garden_group.forum.domain.event.Event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VoteDeletedEvent extends Event {
    private final UUID voteId;
}
