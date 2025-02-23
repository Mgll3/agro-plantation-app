package com.gardengroup.agroplantationapp.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.gardengroup.agroplantationapp.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM  User u WHERE u.email =:email")
    public Optional<User> findByEmail(@Param("email") String email);

    @Query("SELECT u FROM  User u WHERE u.name =:name")
    public User searchName(@Param("name") String name);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.email = :email")
    boolean existsByUseremail(@Param("email") String email);

}
