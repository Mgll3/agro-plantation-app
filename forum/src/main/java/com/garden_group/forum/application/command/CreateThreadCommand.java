package com.garden_group.forum.application.command;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateThreadCommand {
    @Size(min = 5, max = 50, message = "Title must be between 5 and 50 characters")
    @NotBlank(message = "Title is mandatory")
    private final String title;
    @Size(min = 5, max = 500, message = "Content must be between 5 and 500 characters")
    @NotBlank(message = "Content is mandatory")
    private final String content;
    @NotNull(message = "Author ID is mandatory")
    private final UUID authorId;
    @NotNull(message = "Visibility cannot be null")
    private final Boolean isVisible;
}
