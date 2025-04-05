package com.garden_group.forum.presentation.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateVoteResponse {
    private final UUID voteId;
    private final String message;
}
