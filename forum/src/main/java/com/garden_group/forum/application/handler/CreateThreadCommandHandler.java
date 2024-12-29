package com.garden_group.forum.application.handler;

import org.springframework.beans.factory.annotation.Autowired;
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
    private ThreadCommandRepository threadRepository;
    // @Autowired
    // private ThreadMapper threadMapper;

    public Long handle(CreateThreadCommand command) {
        Thread thread = new Thread();
        thread.updateTitle(command.getTitle());
        thread.updateContent(command.getContent());
        thread.setVisibility(command.isVisible());

        threadRepository.save(thread);

        return thread.getId();

    }
}
