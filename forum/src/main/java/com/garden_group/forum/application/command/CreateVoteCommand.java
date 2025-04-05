package com.garden_group.forum.application.command;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateVoteCommand {
    @NotNull(message = "User ID is mandatory")
    private UUID userId;
    @NotNull(message = "Thread ID is mandatory")
    private UUID threadId;
    @NotNull(message = "Vote type is mandatory")
    private Boolean isUpvote;
}
