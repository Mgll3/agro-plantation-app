package com.gardengroup.agroplantationapp.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.model.entity.UserType;

import java.util.Optional;

@Repository
public interface UserTypeRepository extends JpaRepository<UserType, Long> {

    @Query("SELECT u FROM UserType u WHERE u.type = :type")
    Optional<UserType> findByType(@Param("type") String type);

}
