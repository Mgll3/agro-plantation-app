package com.garden_group.forum.presentation.controller.command;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.garden_group.forum.application.command.CreateVoteCommand;
import com.garden_group.forum.application.handler.CreateVoteCommandHandler;
import com.garden_group.forum.presentation.response.CreateVoteResponse;
import com.garden_group.forum.shared.utils.Constants;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/votes")
public class VoteCommandController {

    @Autowired
    private CreateVoteCommandHandler voteCommandHandler;

    @Operation(summary = "Create new vote", description = "End Point to create a new vote in the forum", tags = {
            "Votes" })
    @PostMapping("/create")
    public Mono<ResponseEntity<CreateVoteResponse>> createVote(
            @Valid @RequestBody Mono<CreateVoteCommand> voteCommand) {
        return voteCommandHandler.handle(voteCommand)
                .map(voteId -> {
                    CreateVoteResponse voteResponse = new CreateVoteResponse(voteId,
                            Constants.V_CREATED);
                    return ResponseEntity.created(
                            URI.create("/api/v1/votes/" + voteResponse.getVoteId()))
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(voteResponse);
                });
    }

    @Operation(summary = "Create multiple votes", description = "End Point to create multiple votes in the forum", tags = {
            "Votes" })
    @PostMapping("/bulk-create")
    public Mono<ResponseEntity<List<CreateVoteResponse>>> createMultipleVotes(
            @Valid @RequestBody Flux<CreateVoteCommand> voteCommands) {

        return voteCommandHandler.handleBatch(voteCommands)
                .map(voteId -> new CreateVoteResponse(voteId, Constants.V_CREATED))
                .collectList()
                .map(voteResponses -> ResponseEntity.created(URI.create("/api/v1/votes/bulk-create"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(voteResponses));
    }
}
