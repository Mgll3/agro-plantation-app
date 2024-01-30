package com.gardengroup.agroplantationapp;




import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AgroPlantationAppApplication {
	@Autowired
	private UserService userService;
	public static void main(String[] args) {
		SpringApplication.run(AgroPlantationAppApplication.class, args);


	}





}

