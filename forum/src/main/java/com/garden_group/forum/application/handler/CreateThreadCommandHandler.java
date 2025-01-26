package com.garden_group.forum.application.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.application.mapper.ThreadMapper;
import com.garden_group.forum.domain.entity.Thread;
import com.garden_group.forum.domain.repository.ThreadCommandRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreateThreadCommandHandler {

    @Autowired
    private final ThreadCommandRepository threadRepository;
    @Autowired
    private final ThreadMapper threadMapper;
    @Autowired
    private final ApplicationEventPublisher eventPublisher;

    public Long handle(CreateThreadCommand command) {
        Thread thread = threadMapper.toEntity(command);
        threadRepository.save(thread);

        eventPublisher.publishEvent(threadMapper.toThreadCreatedEvent(thread));
        return thread.getId();
    }
}
