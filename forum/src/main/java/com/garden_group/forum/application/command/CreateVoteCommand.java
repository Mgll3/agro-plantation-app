package com.garden_group.forum.application.command;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateVoteCommand {
    @NotNull(message = "User ID is mandatory")
    private UUID user;
    @NotNull(message = "Thread ID is mandatory")
    private UUID thread;
}
