package com.garden_group.forum.application.command;

import com.garden_group.forum.domain.entity.ForumUser;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateVoteCommand {

    private Long id;
    @NotNull(message = "User ID is mandatory")
    private Long user;
    @NotNull(message = "Thread ID is mandatory")
    private Long thread;
}
