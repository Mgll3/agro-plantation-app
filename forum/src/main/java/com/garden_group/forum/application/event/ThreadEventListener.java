package com.garden_group.forum.application.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.garden_group.forum.application.mapper.ThreadMapper;
import com.garden_group.forum.domain.event.thread.ThreadCreatedEvent;
import com.garden_group.forum.domain.repository.thread.ThreadQueryRepository;
import com.garden_group.forum.infraestructure.repository.query.thread.ThreadMongo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ThreadEventListener {

    @Autowired
    private final ThreadQueryRepository threadNoSqlRepository;
    @Autowired
    private final ThreadMapper threadMapper;

    @EventListener
    public void handleThreadCreatedEvent(ThreadCreatedEvent event) {

        ThreadMongo thread = threadMapper.toThreadMongo(event);

        threadNoSqlRepository.save(thread)
                .doOnError(error -> log.error("Error saving Thread in Secondary DB" + error.getMessage(), error))
                .subscribe();
    }

}
