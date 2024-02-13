package com.gardengroup.agroplantationapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.gardengroup.agroplantationapp.entities.Image;
import com.gardengroup.agroplantationapp.entities.Publication;
import com.gardengroup.agroplantationapp.entities.StateRequest;
import com.gardengroup.agroplantationapp.repository.PublicationRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PublicationService {
    
    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    
    
    @Transactional
    public Publication savePublication(Publication publication) {
        // Modifications to put all new creations with a default values
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
        //TODO: hacer or else para manejar error de publicacion no encontrada
        Publication publication = publicationRepository.findById(publicationId).get();
        //Asignar imagenes a la publicacion
        publication.setMainImage(mainImage);
        publication.setImages(images);
        publicationRepository.save(publication);
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
            Publication PublicationSaved = publicationRepository.findById(publication.getId()).get();
            PublicationSaved.updateInfo(publication);
            return publicationRepository.save(PublicationSaved);
        }
        
    }

    @Transactional
    public void deletePublication(Long id) {
        Optional<Publication> publicationSaved = publicationRepository.findById(id);
        if (publicationSaved.isPresent()) {
            cloudinaryService.delete(publicationSaved.get().getMainImage().getId());
            for (Image image : publicationSaved.get().getImages()) {
                cloudinaryService.delete(image.getId());
            }
            publicationRepository.deleteById(id);
        } else {
            throw new DataAccessException("Publication not found") {
            };
        }
    }

}
