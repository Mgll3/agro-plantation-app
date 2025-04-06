package com.garden_group.forum.presentation.controller.command;

import java.net.URI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import reactor.core.publisher.Mono;
import com.garden_group.forum.application.command.CreateThreadCommand;
import com.garden_group.forum.application.handler.CreateThreadCommandHandler;
import com.garden_group.forum.presentation.response.CreateThreadResponse;
import com.garden_group.forum.shared.utils.Constants;

import io.swagger.v3.oas.annotations.*;

@RestController
@RequestMapping("/api/v1/threads")
public class ThreadCommandController {

        @Autowired
        private CreateThreadCommandHandler threadCommandHandler;

        @Operation(summary = "Create new thread", description = "End Point to create a new thread in the forum", tags = {
                        "Threads" })
        @PostMapping("/create")
        public Mono<ResponseEntity<CreateThreadResponse>> createThread(
                        @Valid @RequestBody Mono<CreateThreadCommand> threadCommand) {

                return threadCommandHandler.handle(threadCommand)
                                .map(threadId -> {
                                        CreateThreadResponse threadResponse = new CreateThreadResponse(threadId,
                                                        Constants.T_CREATED);

                                        return ResponseEntity.created(
                                                        URI.create("/api/v1/threads/" + threadResponse.getThreadId()))
                                                        .contentType(MediaType.APPLICATION_JSON)
                                                        .body(threadResponse);

                                });
        }

}
