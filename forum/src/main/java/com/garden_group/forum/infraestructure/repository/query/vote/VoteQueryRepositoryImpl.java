package com.garden_group.forum.infraestructure.repository.query.vote;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.garden_group.forum.application.query.SearchVoteQueryFilters;
import com.garden_group.forum.domain.repository.vote.VoteQueryRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
@RequiredArgsConstructor
public class VoteQueryRepositoryImpl implements VoteQueryRepository {

    private final VoteQueryNoSqlRepository noSqlRepository;

    private final ReactiveMongoTemplate mongoTemplate;

    @Override
    public Mono<VoteMongo> save(VoteMongo vote) {
        return noSqlRepository.save(vote);
    }

    @Override
    public Mono<Void> deleteById(String id) {
        return noSqlRepository.deleteById(id);
    }

    @Override
    public Flux<VoteMongo> findByUserIdFilters(String userId, SearchVoteQueryFilters filters) {

        Query query = new Query();

        query.addCriteria(Criteria.where("authorId").is(userId));

        if (filters.getIsOnlyUpVotes() != null) {
            query.addCriteria(Criteria.where("isUpVote").is(filters.getIsOnlyUpVotes()));
        }

        if (filters.getOrderBy() != null) {
            Sort.Direction direction = "DESC".equalsIgnoreCase(filters.getSortDirection())
                    ? Sort.Direction.DESC
                    : Sort.Direction.ASC;
            query.with(Sort.by(direction, filters.getOrderBy()));
        }

        query.skip(filters.getPageStart());

        query.limit(filters.getSize());

        return mongoTemplate.find(query, VoteMongo.class);
    }
}
