package com.garden_group.forum.application.mapper;

import org.springframework.stereotype.Component;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.domain.entity.Thread;
import com.garden_group.forum.domain.event.thread.ThreadCreatedEvent;
import com.garden_group.forum.infraestructure.repository.query.thread.ThreadMongo;

@Component
public class ThreadMapper {

    public Thread toEntity(CreateThreadCommand command) {
        Thread thread = new Thread();
        thread.updateTitle(command.getTitle());
        thread.updateContent(command.getContent());
        thread.setVisibility(command.getIsVisible());
        thread.setAuthorId(command.getAuthorId());

        return thread;
    }

    public ThreadCreatedEvent toThreadCreatedEvent(Thread thread) {
        return new ThreadCreatedEvent(
                thread.getId(),
                thread.getTitle(),
                thread.getContent(),
                thread.getAuthorId(),
                thread.getCreatedAt(),
                thread.getUpdatedAt(),
                thread.getIsVisible());
    }

    public ThreadMongo toThreadMongo(ThreadCreatedEvent event) {
        ThreadMongo thread = new ThreadMongo();
        thread.setId(event.getId());
        thread.setTitle(event.getTitle());
        thread.setContent(event.getContent());
        thread.setAuthorId(event.getAuthorId());
        thread.setIsVisible(event.isVisible());
        thread.setCreatedAt(event.getCreatedAt());
        thread.setUpdatedAt(event.getUpdatedAt());

        return thread;
    }
}
