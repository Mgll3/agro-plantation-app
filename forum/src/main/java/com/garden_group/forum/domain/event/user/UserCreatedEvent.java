package com.garden_group.forum.domain.event.user;

import java.util.UUID;

import com.garden_group.forum.domain.event.Event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserCreatedEvent extends Event {
    private final UUID id;
    private String username;
    private String address;
    private String password;
    private String role;
}
