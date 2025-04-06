package com.garden_group.forum.infraestructure.repository.query.user;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface UserQueryNoSqlRepository extends ReactiveMongoRepository<UserMongo, String> {

}
