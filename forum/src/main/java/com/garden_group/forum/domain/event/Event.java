package com.garden_group.forum.domain.event;

import java.util.Date;
import java.util.UUID;

import lombok.Getter;

@Getter
public abstract class Event {
    private final UUID eventId = UUID.randomUUID();
    private final Date eventCreatedAt = new Date();
    private final String eventType = this.getClass().getSimpleName();
}
