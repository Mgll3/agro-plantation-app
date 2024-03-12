package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gardengroup.agroplantationapp.dto.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.dto.PublicationUpdDTO;
import com.gardengroup.agroplantationapp.entity.Image;
import com.gardengroup.agroplantationapp.entity.Publication;
import com.gardengroup.agroplantationapp.entity.StateRequest;
import com.gardengroup.agroplantationapp.entity.User;
import com.gardengroup.agroplantationapp.repository.PublicationRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PublicationService {

    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private UserRepository userRepository;


    @Transactional
    public Publication savePublication(PublicationSaveDTO publicationDTO, String email) {
        
        Publication publication = new Publication(publicationDTO);

        User user = userRepository.searchEmail(email);
        publication.setAuthor(user);

        //Asignaciones de parametros default
        publication.setVisibility(false);
        publication.setScore(0);
        publication.setAuthorizationStatus(new StateRequest(1L));
        publication.setPublicationDate(LocalDateTime.now());
        publication.setPlantation(publication.getPlantation());

        return publicationRepository.save(publication);
    }

    @Transactional
    public void saveImages(MultipartFile mainFile, List<MultipartFile> files, Long publicationId) {
        String folder = "publications";
        
        //Montaje imagenes en Cloudinary
        Map result = cloudinaryService.upload(mainFile, folder);
        Image mainImage = new Image(result.get("public_id").toString(), 
            result.get("secure_url").toString());

        List<Image> images = new ArrayList<Image>();
        for (MultipartFile file : files) {
            //Posible montaje simultaneo de imagenes para mayor velocidad
            result = cloudinaryService.upload(file, folder);
            Image image = new Image(result.get("public_id").toString(), 
                result.get("secure_url").toString());
            images.add(image);
        }

        //Busqueda de publicacion que vamos a modificar
        Publication publication = publicationRepository.findById(publicationId).orElseThrow(() -> new DataAccessException("Publication not found") {
        });

        //Asignar imagenes a la publicacion
        publication.setMainImage(mainImage);
        publication.setImages(images);
        publicationRepository.save(publication);
    }

    @Transactional
    public Publication updateVisibility(Long publicationId, String email) {
        User user = userRepository.searchEmail(email);
        Optional<Publication> optionalPublication = publicationRepository.findById(publicationId);

        if (optionalPublication.isPresent()) {
            Publication publication = optionalPublication.get();

            // Verificar si el usuario es el autor de la publicación
            if (user.equals(publication.getAuthor())) {
                publication.setVisibility(true);
                return publicationRepository.save(publication);
            } else {
                System.out.println("No es el autor de la publicación");
                return null;
            }
        } else {
            System.out.println("Publicación no encontrada");
            return null;
        }
    }

    public List<Publication> getTopPublications() {
        List<Publication> allPublications = publicationRepository.findTop6ByOrderByScoreDesc();
        // Limitar la cantidad de publicaciones devueltas a exactamente 6
        return allPublications.stream().limit(6).collect(Collectors.toList());
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
    public void updatePublication(PublicationUpdDTO publicationUpdDTO) {

        Publication publication = new Publication(publicationUpdDTO);

        if (!publicationRepository.existsById(publication.getId())) {
            throw new DataAccessException("Publication not found") {
            };
        }   else {
            Publication PublicationSaved = publicationRepository.findById(publication.getId()).get();
            PublicationSaved.updateInfo(publication);
            publicationRepository.save(PublicationSaved);
        }

    }

    @Transactional
    public void deletePublication(Long id) {
        Publication publicationSaved = publicationRepository.findById(id).orElseThrow(() -> new DataAccessException("Publication not found") {
        });
        
        cloudinaryService.delete(publicationSaved.getMainImage().getId());
        for (Image image : publicationSaved.getImages()) {
            cloudinaryService.delete(image.getId());
        }
        publicationRepository.deleteById(id);
        
    }

}
