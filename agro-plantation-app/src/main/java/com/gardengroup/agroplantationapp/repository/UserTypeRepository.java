package com.gardengroup.agroplantationapp.repository;

import com.gardengroup.agroplantationapp.entities.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTypeRepository extends JpaRepository<UserType,Long> {
}
