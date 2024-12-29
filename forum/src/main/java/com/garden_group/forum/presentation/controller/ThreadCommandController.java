package com.garden_group.forum.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.application.handler.CreateThreadCommandHandler;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/threads")
public class ThreadCommandController {

    @Autowired
    private CreateThreadCommandHandler createThreadCommandHandler;

    @PostMapping("/create")
    public ResponseEntity<Long> createThread(@RequestBody CreateThreadCommand command) {

        Long threadId = createThreadCommandHandler.handle(command);

        return new ResponseEntity<>(threadId, HttpStatus.CREATED);
    }
}
