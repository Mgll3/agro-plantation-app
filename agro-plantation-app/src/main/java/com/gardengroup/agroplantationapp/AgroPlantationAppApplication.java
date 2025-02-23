package com.gardengroup.agroplantationapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AgroPlantationAppApplication {
	public static void main(String[] args) {
		SpringApplication.run(AgroPlantationAppApplication.class, args);
		
		/*
		mvn package -DskipTests
		docker build -t agro-plantation:1.62 .
		docker pull mysql:8.1
		docker run --name mysql-standalone -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=agroplantationapp -e MYSQL_USER=dev -e MYSQL_PASSWORD=dev -p 3306:3306 -d mysql:8.1
		docker run -d -p 8080:8080 --name agro-plantation --link mysql-standalone:mysql 45c1aa341cf3b7d80d43c85adb182ec8f72f63976e289004077534ff32799e3f











		docker image ls

		docker commit nombre_del_contenedor nombre_de_la_imagen
		docker commit 925ec13322ac agro-plantation
		docker commit 36b6f8129087 mysql-standalone

		::docker tag nombre_de_la_imagen usuario_dockerhub/nombre_del_repositorio
		docker tag agro-plantation:1.62 mgll3/agro-plantation-app:Api-v1.62
		docker tag mysql-standalone mgll3/agro-plantation-app:Mysql-v1.1

		docker push mgll3/agro-plantation-app:Api-v1.62
		docker push mgll3/agro-plantation-app:Mysql-v1.1
		*/

	}

}

