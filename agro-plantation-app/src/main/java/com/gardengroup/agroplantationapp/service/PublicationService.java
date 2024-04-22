package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.model.dto.publication.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationUpdDTO;
import com.gardengroup.agroplantationapp.model.entity.*;
import com.gardengroup.agroplantationapp.model.repository.PublicationRepository;
import com.gardengroup.agroplantationapp.model.repository.StateRequestRepository;
import com.gardengroup.agroplantationapp.model.repository.UserRepository;
import com.gardengroup.agroplantationapp.model.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PublicationService implements IPublicationService {

    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    StateRequestRepository stateRequestRepository;
    @Autowired
    VoteRepository voteRepository;


    //crea la publicacion y ya pone su estado de la autorizacion en pendiente
    @Transactional
    public Publication savePublication(PublicationSaveDTO publicationDTO, String email) {

        Publication publication = new Publication(publicationDTO);

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new DataAccessException("User not found") {
        });

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

        //Busqueda de publicacion que vamos a modificar
        Publication publication = publicationRepository.findById(publicationId).orElseThrow(() -> new DataAccessException("Publication not found") {
        });

        //Revisar si hay imagen principal y luego guardarla
        if (mainFile.getOriginalFilename() != ""){
            Map result = cloudinaryService.upload(mainFile, folder);
    
            Image mainImage = new Image(result.get("public_id").toString(), 
            result.get("secure_url").toString());
            publication.setMainImage(mainImage);
        } else{
            throw new DataAccessException("Main image not found") {
            };
        }
        List<Image> images = new ArrayList<Image>();
        //Revisar si hay imagenes secundarias y luego guardarlas
        if (files.get(0).getOriginalFilename() != "") {
            for (MultipartFile file : files) {
                //Posible montaje simultaneo de imagenes para mayor velocidad
                Map resultC = cloudinaryService.upload(file, folder);
                Image image = new Image(resultC.get("public_id").toString(), 
                    resultC.get("secure_url").toString());
                images.add(image);
            }
            publication.setImages(images);
        } 
        
        publicationRepository.save(publication);
    }

    @Transactional
    public Publication updateVisibility(Long publicationId, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new DataAccessException("User not found") {
        });

        Optional<Publication> optionalPublication = publicationRepository.findById(publicationId);

        if (optionalPublication.isPresent()) {
            Publication publication = optionalPublication.get();

            // Verificar si el usuario es el autor de la publicación
            if (user.equals(publication.getAuthor())) {
                // Verificar si la publicación está autorizada
                if (publication.getAuthorizationStatus().getState().equals("ACCEPTED")) {
                    publication.setVisibility(true);
                    return publicationRepository.save(publication);
                } else {
                    System.out.println("La publicación no está autorizada");
                    return null;
                }
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

        final List<Publication> publications = publicationRepository.publicationsByEmail(email);

        if (publications.size() > 0) {
            return publications;
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
        } else {
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

    @Transactional
    public List<Publication> pendingPublications() {
        return publicationRepository.findAllPendingPublications();
    }

    @Transactional
    public void approvePublication(Long publicationId) {
        Optional<Publication> optionalPublication = publicationRepository.findById(publicationId);

        if (optionalPublication.isPresent()) {
            Publication publication = optionalPublication.get();

            if ("PENDING".equals(publication.getAuthorizationStatus().getState())) {

                // Buscar el estado "ACCEPTED" en la tabla StateRequest
                StateRequest acceptedState = stateRequestRepository.findByState("ACCEPTED")
                        .orElseThrow(() -> new RuntimeException("Estado 'ACCEPTED' no encontrado"));

                // Asignar el estado "ACCEPTED" a la publicación
                publication.setAuthorizationStatus(acceptedState);

                publicationRepository.save(publication);
            } else {
                throw new IllegalStateException("La publicación con ID " + publicationId + " no está en estado PENDIENTE");
            }
        } else {
            throw new IllegalArgumentException("Publicación con ID " + publicationId + " no encontrada.");
        }
    }

    @Transactional
    public void rejectPublication(Long publicationId) {
        Optional<Publication> optionalPublication = publicationRepository.findById(publicationId);

        if (optionalPublication.isPresent()) {
            Publication publication = optionalPublication.get();

            if ("PENDING".equals(publication.getAuthorizationStatus().getState())) {
                // Buscar el estado "DECLINED" en la tabla StateRequest
                StateRequest declinedState = stateRequestRepository.findByState("DECLINED")
                        .orElseThrow(() -> new RuntimeException("Estado 'DECLINED' no encontrado"));

                // Asignar el estado "DECLINED" a la publicación
                publication.setAuthorizationStatus(declinedState);

                // Guardar la publicación actualizada en la base de datos
                publicationRepository.save(publication);
            } else {
                throw new IllegalStateException("La publicación con ID " + publicationId + " no está en estado PENDIENTE");
            }
        } else {
            throw new IllegalArgumentException("Publicación con ID " + publicationId + " no encontrada.");
        }
    }


    @Transactional
    public Vote toggleVote(Long publicationId, String userEmail) {

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new IllegalArgumentException("Publicación no encontrada"));

        // Verificar si el usuario ya ha votado en esta publicación
        Vote existingVote = voteRepository.findByUserEmailAndPublicationId(userEmail, publicationId);

        if (existingVote != null) {
            // El usuario ya ha votado, cambiar el estado del voto
            existingVote.setState(!existingVote.isState()); // Cambiar el estado del voto

            // Actualizar el puntaje de la publicación en función del cambio de estado del voto
            int scoreChange = existingVote.isState() ? 1 : -1; // Sumar 1 al puntaje si se vota positivamente, restar 1 si se quita el voto positivo
            int newScore = publication.getScore() + scoreChange; // Calcular el nuevo puntaje
            publication.setScore(newScore);

            // Guardar el voto actualizado en la base de datos
            voteRepository.save(existingVote);
        } else {
            // El usuario no ha votado antes, se crea un nuevo voto
            User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new DataAccessException("User not found") {
            });

            Vote newVote = new Vote();
            newVote.setUser(user);
            newVote.setPublication(publication);
            newVote.setState(true); // Indica que el usuario votó positivamente

            // Actualizar el puntaje de la publicación sumando 1 al puntaje actual
            int newScore = publication.getScore() + 1; // Sumar 1 al puntaje
            publication.setScore(newScore);

            // Guardar el nuevo voto en la base de datos
            voteRepository.save(newVote);
        }

        // Guardar la publicación con el puntaje actualizado
        publicationRepository.save(publication);

        return existingVote;
    }


    @Transactional
    public List<Publication> getPublicationsByLike(int pag){
        
        if (pag < 1) {
            throw new IllegalArgumentException("Invalid page number");
        }
        pag = (pag-1) * 15;
        int pagTop= pag + 15;
        final List<Publication> publications = publicationRepository.publicationsBylike(pag, pagTop);

        if (publications.size() > 0) {
            return publications;
        } else {
            throw new DataAccessException("Publications not found") {
            };
        }
    }

}
