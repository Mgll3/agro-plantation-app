package com.gardengroup.agroplantationapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.entity.User;



@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query("SELECT u FROM  User u WHERE u.email =:email")
    public User searchEmail(@Param("email") String email);
    @Query("SELECT u FROM  User u WHERE u.name =:name")
    public User searchName(@Param("name") String name);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.email = :email")
    boolean existsByUseremail(@Param("email") String email);

}
