package com.garden_group.forum.application.command;

import lombok.Data;

@Data
public class CreateThreadCommand {

    private final String title;
    private final String content;
    private final String authorId;
    private final boolean isVisible;
}
