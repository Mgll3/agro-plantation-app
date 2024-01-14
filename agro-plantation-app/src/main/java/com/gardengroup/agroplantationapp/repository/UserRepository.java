package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    @Query("SELECT u FROM User u WHERE u.name =: name ")
    public User searchName(@Param("name") String name);
    @Query("SELECT u FROM  User u WHERE u.email =:email")
    public User searchEmail (@Param("email") String email);


}
