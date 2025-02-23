package com.garden_group.forum.infraestructure.repository.query;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ThreadQueryNoSqlRepository extends MongoRepository<ThreadMongo, String>{
    
}
