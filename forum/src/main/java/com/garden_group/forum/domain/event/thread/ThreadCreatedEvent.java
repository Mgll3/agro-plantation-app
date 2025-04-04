package com.garden_group.forum.domain.event.thread;

import java.time.LocalDateTime;
import java.util.UUID;
import com.garden_group.forum.domain.event.Event;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class ThreadCreatedEvent extends Event {

    @Getter
    private final UUID id;
    @Getter
    private final String title;
    @Getter
    private final String content;
    @Getter
    private final UUID authorId;
    @Getter
    private final LocalDateTime createdAt;
    @Getter
    private final LocalDateTime updatedAt;
    @Getter
    private final boolean isVisible;

}
