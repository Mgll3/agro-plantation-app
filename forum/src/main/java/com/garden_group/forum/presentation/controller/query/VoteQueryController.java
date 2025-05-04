package com.garden_group.forum.presentation.controller.query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.garden_group.forum.application.handler.FindVoteQueryHandler;
import com.garden_group.forum.application.mapper.VoteMapper;
import com.garden_group.forum.application.query.SearchVoteQueryFilters;
import com.garden_group.forum.presentation.response.VoteResponse;
import com.garden_group.forum.shared.utils.Constants;

import org.springframework.http.MediaType;
import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.ws.rs.Path;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/votes")
public class VoteQueryController {

    @Autowired
    private FindVoteQueryHandler voteQueryHandler;
    @Autowired
    private VoteMapper voteMapper;

    @Operation(summary = "Search Votes by User ID", description = "End Point to search votes by user ID in the forum", tags = {
            "Votes" })
    @GetMapping("/user/{userId}")
    public Flux<VoteResponse> getVotesByUserId(
            @PathVariable UUID userId,
            @ModelAttribute @Valid SearchVoteQueryFilters voteQuery) {

        return voteQueryHandler.handle(userId, voteQuery);

    }

}
