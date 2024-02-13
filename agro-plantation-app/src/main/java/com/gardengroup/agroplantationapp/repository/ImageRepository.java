package com.gardengroup.agroplantationapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gardengroup.agroplantationapp.entities.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, String>{
    
}
