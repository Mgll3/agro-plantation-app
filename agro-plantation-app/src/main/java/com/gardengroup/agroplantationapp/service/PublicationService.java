package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.entities.StateRequest;
import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.gardengroup.agroplantationapp.entities.Publication;

import com.gardengroup.agroplantationapp.repository.PlantationRepository;
import com.gardengroup.agroplantationapp.repository.PublicationRepository;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private PlantationRepository plantationRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;


    @Transactional
    public Publication savePublication(Publication publication, String email) {
        User user = userRepository.searchEmail(email);

        // Verificar si el usuario es de tipo "PRODUCER"
        if ("PRODUCER".equals(user.getUserType().getType())) {
            publication.setAuthor(user);

            publication.setVisibility(false);
            publication.setScore(0);
            publication.setAuthorizationStatus(new StateRequest(1L));
            publication.setPublicationDate(LocalDateTime.now());
            publication.setPlantation(publication.getPlantation());

            return publicationRepository.save(publication);
        } else {
            System.out.println("No es producter");
            return null;
        }
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
    public Publication updatePublication(Publication publication) {

        if (!publicationRepository.existsById(publication.getId())) {
            throw new DataAccessException("Publication not found") {
            };
        } else {
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
