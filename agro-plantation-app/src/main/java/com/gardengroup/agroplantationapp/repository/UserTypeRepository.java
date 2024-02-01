package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.entities.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTypeRepository extends JpaRepository<UserType,Long> {

    @Query("SELECT u FROM  UserType u WHERE u.type =:type")
    public User finByType(@Param("type") String type);
}
