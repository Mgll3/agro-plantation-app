package com.garden_group.forum.infraestructure.repository.query.vote;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface VoteQueryNoSqlRepository extends ReactiveMongoRepository<VoteMongo, String> {

}
