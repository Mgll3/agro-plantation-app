package com.garden_group.forum.presentation.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateThreadResponse {
    private final UUID threadId;
    private final String message;
}
