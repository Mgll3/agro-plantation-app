package com.garden_group.forum.presentation.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VoteResponse {
    private final UUID id;
    private final UUID authorId;
    private final UUID threadId;
    private final Boolean isUpvote;
}
