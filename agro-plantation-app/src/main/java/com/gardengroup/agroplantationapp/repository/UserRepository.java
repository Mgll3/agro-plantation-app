package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {



}
