package com.garden_group.forum.presentation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateThreadResponse {
    private final Long threadId;
    private final String message;
}
