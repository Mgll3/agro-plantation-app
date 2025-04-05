package com.garden_group.forum.infraestructure.repository.query.thread;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface ThreadQueryNoSqlRepository extends ReactiveMongoRepository<ThreadMongo, String> {

}
