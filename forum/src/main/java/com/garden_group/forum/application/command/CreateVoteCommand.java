package com.garden_group.forum.application.command;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateVoteCommand {
    @NotNull(message = "User ID is mandatory")
    private Long user;
    @NotNull(message = "Thread ID is mandatory")
    private Long thread;
}
