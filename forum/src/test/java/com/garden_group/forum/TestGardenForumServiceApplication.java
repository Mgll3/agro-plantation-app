package com.garden_group.forum;

import org.springframework.boot.SpringApplication;

public class TestGardenForumServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(GardenForumServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
