package com.garden_group.forum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;

@EnableR2dbcRepositories
@SpringBootApplication
public class GardenForumServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GardenForumServiceApplication.class, args);
	}

}
