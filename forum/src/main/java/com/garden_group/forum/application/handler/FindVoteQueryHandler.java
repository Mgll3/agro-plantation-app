package com.garden_group.forum.application.handler;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.garden_group.forum.application.mapper.VoteMapper;
import com.garden_group.forum.application.query.SearchVoteQueryFilters;
import com.garden_group.forum.domain.entity.Vote;
import com.garden_group.forum.domain.repository.vote.VoteQueryRepository;
import com.garden_group.forum.presentation.response.VoteResponse;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class FindVoteQueryHandler {

    @Autowired
    private final VoteQueryRepository voteQueryRepository;
    @Autowired
    private final VoteMapper voteMapper;

    public Flux<VoteResponse> handle(UUID userId, SearchVoteQueryFilters filters) {

        return voteQueryRepository.findByUserIdFilters(String.valueOf(userId), filters)
                // TODO pasar de Mongo a VoteResponse
                .map(vote -> voteMapper.toVoteResponse(vote));

    }
}
