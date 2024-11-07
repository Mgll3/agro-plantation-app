package com.gardengroup.agroplantationapp.service;

import com.gardengroup.agroplantationapp.model.dto.publication.PublicationDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationFilterDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationUpdDTO;
import com.gardengroup.agroplantationapp.model.entity.*;
import com.gardengroup.agroplantationapp.model.repository.PublicationRepository;
import com.gardengroup.agroplantationapp.model.repository.StateRequestRepository;
import com.gardengroup.agroplantationapp.model.repository.UserRepository;
import com.gardengroup.agroplantationapp.model.repository.VoteRepository;
import com.gardengroup.agroplantationapp.utils.Constants;

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

    // crea la publicacion y ya pone su estado de la autorizacion en pendiente
    @Transactional
    public Publication savePublication(PublicationSaveDTO publicationDTO, String email) {

        Publication publication = new Publication(publicationDTO);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataAccessException(Constants.U_NOT_FOUND) {
                });

        publication.setAuthor(user);

        // Asignaciones de parametros default
        publication.setVisibility(false);
        publication.setScore(0);
        // Inicializo la publicacion con estado pendiente
        publication.setAuthorizationStatus(new StateRequest(1L));
        publication.setPublicationDate(LocalDateTime.now());
        publication.setPlantation(publication.getPlantation());

        return publicationRepository.save(publication);
    }

    @Transactional
    public void saveImages(MultipartFile mainFile, List<MultipartFile> files, Long publicationId) {
        String folder = "publications";

        // Busqueda de publicacion que vamos a modificar
        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });

        // Revisar si hay imagen principal y luego guardarla
        if (!mainFile.getOriginalFilename().isEmpty()) {
            Map result = cloudinaryService.upload(mainFile, folder);

            Image mainImage = new Image(result.get("public_id").toString(),
                    result.get("secure_url").toString());
            publication.setMainImage(mainImage);
        } else {
            throw new DataAccessException("Main image not found") {
            };
        }
        List<Image> images = new ArrayList<>();
        // Chequeo si hay imagenes secundarias y luego guardarlas
        if (!files.get(0).getOriginalFilename().isEmpty()) {
            for (MultipartFile file : files) {
                // Posible montaje simultaneo de imagenes para mayor velocidad
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
                .orElseThrow(() -> new DataAccessException(Constants.U_NOT_FOUND) {
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
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public List<Publication> getTopPublications() {

        List<Publication> allPublications = publicationRepository.findTop6ByOrderByScoreDesc();

        if (allPublications.isEmpty()) {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }
        // Limitar la cantidad de publicaciones devueltas a exactamente 6
        return allPublications.stream().limit(6).collect(Collectors.toList());
    }

    @Transactional
    public PublicationDTO getPublication(Long publicationId, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataAccessException(Constants.U_NOT_FOUND) {
                });

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });
        Optional<Vote> voto = voteRepository.findByUserAndPublication(user.getId(), publicationId);

        PublicationDTO publicationDTO = new PublicationDTO(publication);

        if (voto.isPresent()) {
            publicationDTO.setUserVote(true);
        } else {
            publicationDTO.setUserVote(false);
        }
        return publicationDTO;

    }

    @Transactional
    public List<Publication> publicationsByEmail(String email) {

        final List<Publication> publications = publicationRepository.publicationsByEmail(email);

        if (!publications.isEmpty()) {
            return publications;
        } else {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }

    }

    @Transactional
    public void updatePublication(PublicationUpdDTO publicationUpdDTO) {

        Publication publication = new Publication(publicationUpdDTO);

        if (!publicationRepository.existsById(publication.getId())) {
            throw new DataAccessException(Constants.P_NOT_FOUND) {
            };
        } else {
            Publication publicationSaved = publicationRepository.findById(publication.getId()).get();
            publicationSaved.updateInfo(publication);
            publicationRepository.save(publicationSaved);
        }

    }

    @Transactional
    public void deletePublication(Long id) {
        Publication publicationSaved = publicationRepository.findById(id)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });

        // Comprobaciones, existencia de las imagenes
        if (publicationSaved.getMainImage() != null) {
            cloudinaryService.delete(publicationSaved.getMainImage().getId());
        }
        if (publicationSaved.getImages() != null) {

            for (Image image : publicationSaved.getImages()) {
                cloudinaryService.delete(image.getId());
            }
        }

        publicationRepository.deleteById(id);

    }

    @Transactional
    public List<Publication> pendingPublications() {
        return publicationRepository.findAllPendingPublications();
    }

    @Transactional
    public void approvePublication(Long publicationId) {
        // 1. Buscar la publicación por su ID en el repositorio
        Optional<Publication> optionalPublication = publicationRepository.findById(publicationId);

        // 2. Verificar si la publicación existe
        if (optionalPublication.isPresent()) {
            // 3. Obtener la publicación desde Optional si está presente
            Publication publication = optionalPublication.get();

            // 4. Verificar si la publicación está en estado "PENDING"
            if ("PENDING".equals(publication.getAuthorizationStatus().getState())) {

                // 5. Buscar el estado "ACCEPTED" en la tabla StateRequest
                StateRequest acceptedState = stateRequestRepository.findByState("ACCEPTED")
                        .orElseThrow(() -> new RuntimeException("Estado 'ACCEPTED' no encontrado"));

                // 6. Asignar el estado "ACCEPTED" a la publicación
                publication.setAuthorizationStatus(acceptedState);

                // 7. Actualizar el campo visibility a true
                publication.setVisibility(true);

                // 8. Guardar los cambios en la base de datos utilizando el repositorio
                publicationRepository.save(publication);

            } else {
                // 9. Lanzar una excepción si la publicación no está en estado "PENDING"
                throw new IllegalStateException(
                        "La publicación con ID " + publicationId + " no está en estado PENDIENTE");
            }
        } else {
            // 10. Lanzar una excepción si no se encuentra la publicación con el ID
            // proporcionado
            throw new IllegalArgumentException(Constants.P_NOT_FOUND);
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
                throw new IllegalStateException(
                        "La publicación con ID " + publicationId + " no está en estado PENDIENTE");
            }
        } else {
            throw new IllegalArgumentException("Publicación con ID " + publicationId + " no encontrada.");
        }
    }

    @Transactional
    public Vote toggleVote(Long publicationId, String userEmail) {

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new IllegalArgumentException(Constants.P_NOT_FOUND));

        // Verificar si el usuario ya ha votado en esta publicación
        Vote existingVote = voteRepository.findByUserEmailAndPublicationId(userEmail, publicationId);

        if (existingVote != null) {
            // El usuario ya ha votado, cambiar el estado del voto
            existingVote.setState(!existingVote.isState()); // Cambiar el estado del voto

            // Actualizar el puntaje de la publicación en función del cambio de estado del
            // voto
            int scoreChange = existingVote.isState() ? 1 : -1; // Sumar 1 al puntaje si se vota positivamente, restar 1
                                                               // si se quita el voto positivo
            int newScore = publication.getScore() + scoreChange; // Calcular el nuevo puntaje
            publication.setScore(newScore);

            // Guardar el voto actualizado en la base de datos
            voteRepository.save(existingVote);
        } else {
            // El usuario no ha votado antes, se crea un nuevo voto
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new DataAccessException(Constants.U_NOT_FOUND) {
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
    public PublicationFilterDTO getPublicationsByLike(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Busco si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        if (pag == 1) {
            pag = 0;
        } else {
            pag = (pag - 1) * 15;
        }

        List<Publication> publications = publicationRepository.publicationsBylike(pag, pagTop);
        // Calculo número posible de paginaciones que hay en base de datos
        Double paginationDouble = (double) publications.size() / 15;
        int pagination = (int) (Math.ceil(paginationDouble) - 1);

        if (!publications.isEmpty()) {
            if (publications.size() > 15) {
                // Envio solo 15 publicaciones que necesita el front
                publications = publications.subList(0, 15);
            }

            return new PublicationFilterDTO(publications, pagination);

        } else {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }
    }

    @Transactional
    public PublicationFilterDTO getPublicationsByUser(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Busco si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        if (pag == 1) {
            pag = 0;
        } else {
            pag = (pag - 1) * 15;
        }

        List<Publication> publications = publicationRepository.publicationsByUser(pag, pagTop);
        // Calculo número posible de paginaciones que hay en base de datos
        Double paginationDouble = (double) publications.size() / 15;
        int pagination = (int) (Math.ceil(paginationDouble) - 1);

        if (!publications.isEmpty()) {
            if (publications.size() > 15) {
                // Envio solo 15 publicaciones que necesita el front
                publications = publications.subList(0, 15);
            }

            return new PublicationFilterDTO(publications, pagination);

        } else {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }
    }

    @Transactional
    public PublicationFilterDTO getPublicationsByDate(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Busco si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        if (pag == 1) {
            pag = 0;
        } else {
            pag = (pag - 1) * 15;
        }

        List<Publication> publications = publicationRepository.publicationsByDate(pag, pagTop);
        // Calculo número posible de paginaciones que hay en base de datos
        Double paginationDouble = (double) publications.size() / 15;
        int pagination = (int) (Math.ceil(paginationDouble) - 1);

        if (!publications.isEmpty()) {
            if (publications.size() > 15) {
                // Envio solo 15 publicaciones que necesita el front
                publications = publications.subList(0, 15);
            }

            return new PublicationFilterDTO(publications, pagination);

        } else {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }
    }

    @Transactional
    public PublicationFilterDTO getPublicationsByAleatory(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Busco si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        if (pag == 1) {
            pag = 0;
        } else {
            pag = (pag - 1) * 15;
        }

        List<Publication> publications = publicationRepository.publicationsByAleatory(pag, pagTop);
        // Calculo número posible de paginaciones que hay en base de datos
        Double paginationDouble = (double) publications.size() / 15;
        int pagination = (int) (Math.ceil(paginationDouble) - 1);

        if (!publications.isEmpty()) {
            if (publications.size() > 15) {
                // Envio solo 15 publicaciones que necesita el front
                publications = publications.subList(0, 15);
            }

            return new PublicationFilterDTO(publications, pagination);

        } else {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }
    }

    @Transactional
    public PublicationFilterDTO getPublicationsByPending(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Busco si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        if (pag == 1) {
            pag = 0;

        } else {
            pag = (pag - 1) * 15;
        }

        final List<Publication> publications = publicationRepository.publicationsByPending(pag, pagTop);
        // Calculo número posible de paginaciones que hay en base de datos
        Double paginationDouble = (double) publicationRepository.countPublicationsByPending() / 15;
        int pagination = (int) (Math.ceil(paginationDouble) - 1);

        if (!publications.isEmpty()) {
            return new PublicationFilterDTO(publications, pagination);

        } else {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }

    }

    @Transactional
    public PublicationFilterDTO getPublicationsByQuantity(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Busco si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        if (pag == 1) {
            pag = 0;
        } else {
            pag = (pag - 1) * 15;
        }

        List<Publication> publications = publicationRepository.publicationsByQuantity(pag, pagTop);
        // Calculo número posible de paginaciones que hay en base de datos
        Double paginationDouble = (double) publications.size() / 15;
        int pagination = (int) (Math.ceil(paginationDouble) - 1);

        if (!publications.isEmpty()) {
            if (publications.size() > 15) {
                // Envio solo 15 publicaciones que necesita el front
                publications = publications.subList(0, 15);
            }

            return new PublicationFilterDTO(publications, pagination);

        } else {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }
    }

    // Temporal
    @Transactional
    public void changeToPending(Long publicationId) {
        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });
        publication.setAuthorizationStatus(new StateRequest(1L));

        publicationRepository.save(publication);

    }

    @Transactional
    public void requestApproval(Long publicationId, String email) {
        // 1. Buscar la publicación por su ID en el repositorio
        Optional<Publication> optionalPublication = publicationRepository.findById(publicationId);
        // 2. Verificar si la publicación existe
        if (optionalPublication.isPresent()) {
            // 3. Obtener la publicación desde Optional si está presente
            Publication publication = optionalPublication.get();
            // 4. Actualizar el estado de autorización de la publicación a "PENDING"
            publication.getAuthorizationStatus().setState("PENDING");

            // 5. Guardar los cambios en la base de datos utilizando el repositorio
            publicationRepository.save(publication);
        } else {

            throw new DataAccessException("Publication not found with ID: " + publicationId) {
            };
        }
    }

}
