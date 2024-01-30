package com.gardengroup.agroplantationapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.gardengroup.agroplantationapp.entities.Publication;
import com.gardengroup.agroplantationapp.enumerations.AuthorizationType;
import com.gardengroup.agroplantationapp.repository.PlantationRepository;
import com.gardengroup.agroplantationapp.repository.PublicationRepository;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PublicationService {
    
    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private PlantationRepository plantationRepository;

    @Transactional
    public Publication savePublication(Publication publication) {
        // Modifications for put all new creations with a standar base
        publication.setVisibility(false);
        publication.setScore(0);
        publication.setAuthorizationStatus(AuthorizationType.PENDING);
        publication.setPublicationDate(new java.sql.Date(System.currentTimeMillis()));
        
        publication.setPlantation(plantationRepository.save(publication.getPlantation()));
        return publicationRepository.save(publication);
    }

    @Transactional
    public Publication getPublication(Long id) {
        
        Optional<Publication> publication = publicationRepository.findById(id);
        
        if (publication.isPresent()) {
            return publication.get();
        } else {
            throw new DataAccessException("Publications not found") {
            };
        }
        
    }

    @Transactional
    public List<Publication> publicationsByEmail(String email) {

        final List<Publication> publication = publicationRepository.publicationsByEmail(email);
        
        if (publication.size() > 0) {
            return publication;
        } else {
            throw new DataAccessException("Publications not found") {
            };
        }
    }

    
    @Transactional
    public Publication updatePublication(Publication publication){
        
        if (!publicationRepository.existsById(publication.getId())) {
            throw new DataAccessException("Publication not found") {
            };
        }   else {
            return publicationRepository.save(publication);
        }

    }

    @Transactional
    public void deletePublication(Long id) {
        if (publicationRepository.existsById(id)) {
            publicationRepository.deleteById(id);
        } else {
            throw new DataAccessException("Publication not found") {
            };
        }
    }
    



}
