package com.garden_group.forum.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.application.handler.CreateThreadCommandHandler;
import com.garden_group.forum.presentation.dto.CreateThreadResponse;

import io.swagger.v3.oas.annotations.*;

@RestController
@RequestMapping("/api/v1/threads")
public class ThreadCommandController {

    @Autowired
    private CreateThreadCommandHandler createThreadCommandHandler;

    @Operation(summary = "Crear nuevo hilo", description = "End Point para Crear un nuevo hilo en el foro", tags = {
            "Threads" })
    @PostMapping("/create")
    public ResponseEntity<CreateThreadResponse> createThread(@Valid @RequestBody CreateThreadCommand command) {

        Long threadId = createThreadCommandHandler.handle(command);

        CreateThreadResponse response = new CreateThreadResponse(threadId,
                "Thread created successfully");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
