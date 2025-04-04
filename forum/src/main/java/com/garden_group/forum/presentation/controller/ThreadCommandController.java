package com.garden_group.forum.presentation.controller;

import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import reactor.core.publisher.Mono;
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
    public Mono<ResponseEntity<CreateThreadResponse>> createThread(
            @Valid @RequestBody Mono<CreateThreadCommand> threadCommand) {

        return createThreadCommandHandler.handle(threadCommand)
                .map(threadId -> {
                    CreateThreadResponse threadResponse = new CreateThreadResponse(threadId,
                            "Thread created successfully");

                    return ResponseEntity.created(
                            URI.create("/api/v1/threads/" + threadResponse.getThreadId()))
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(threadResponse);

                });
    }

}
