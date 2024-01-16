package com.gardengroup.agroplantationapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.gardengroup.agroplantationapp.entities.Publication;
import com.gardengroup.agroplantationapp.repository.PlantationRepository;
import com.gardengroup.agroplantationapp.repository.PublicationRepository;

import jakarta.transaction.Transactional;

import java.util.Optional;

@Service
public class PublicationService {
    
    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private PlantationRepository plantationRepository;

    @Transactional
    public Publication savePublication(Publication publication) {
        publication.setPlantation(plantationRepository.save(publication.getPlantation()));
        return publicationRepository.save(publication);
    }

    



}
