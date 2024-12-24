package com.gardengroup.agroplantationapp.service.implementation;

import com.gardengroup.agroplantationapp.exception.UnauthorizedActionException;
import com.gardengroup.agroplantationapp.model.dto.publication.*;
import com.gardengroup.agroplantationapp.model.entity.*;
import com.gardengroup.agroplantationapp.model.repository.PublicationRepository;
import com.gardengroup.agroplantationapp.service.implementation.VoteService.VoteAndPublicationDTO;
import com.gardengroup.agroplantationapp.service.interfaces.IPublicationService;
import com.gardengroup.agroplantationapp.service.interfaces.IUserService;
import com.gardengroup.agroplantationapp.service.interfaces.IVoteService;
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
    private IUserService userService;
    @Autowired
    private IVoteService voteService;

    @Transactional
    public Publication savePublication(PublicationSaveDTO publicationDTO, String email) {

        Publication publication = new Publication(publicationDTO);

        User user = userService.findByEmail(email);
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

        User user = userService.findByEmail(email);

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });

        if (!publication.getAuthorizationStatus().getState().equals("ACCEPTED")) {
            throw new UnauthorizedActionException("Publication Not Authorized.");
        }

        if (!user.equals(publication.getAuthor())) {
            throw new UnauthorizedActionException("User not authorized to change visibility.");
        }

        publication.setVisibility(true);
        return publicationRepository.save(publication);

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

        User user = userService.findByEmail(email);

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });

        // Devolver si el usuario ya ha votado en esta publicación
        Boolean voto = voteService.findByUserAndPublication(user.getId(), publicationId);
        PublicationDTO publicationDTO = new PublicationDTO(publication);
        publicationDTO.setUserVote(voto);

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
    public Publication updatePublication(PublicationUpdDTO publicationUpdDTO) {

        Publication publication = new Publication(publicationUpdDTO);

        if (!publicationRepository.existsById(publication.getId())) {
            throw new DataAccessException(Constants.P_NOT_FOUND) {
            };
        } else {
            Publication publicationSaved = publicationRepository.findById(publication.getId()).get();
            publicationSaved.updateInfo(publication);
            return publicationRepository.save(publicationSaved);
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
    public void deleteAllByUser(Long userId) {

        List<Publication> publications = publicationRepository.findByAuthorId(userId);
        for (Publication publication : publications) {
            if (publication.getMainImage() != null) {
                cloudinaryService.delete(publication.getMainImage().getId());
            }
            if (publication.getImages() != null) {

                for (Image image : publication.getImages()) {
                    cloudinaryService.delete(image.getId());
                }
            }
        }
        publicationRepository.deleteAllByAuthorId(userId);

    }

    public List<Publication> pendingPublications() {
        return publicationRepository.findAllPendingPublications();
    }

    @Transactional
    public void approvePublication(Long publicationId) {

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });

        // Verificar si la publicación está en estado "PENDING"
        if ("PENDING".equals(publication.getAuthorizationStatus().getState())) {

            // Asignar el estado (2) "ACCEPTED" a la publicación
            publication.setAuthorizationStatus(new StateRequest(2L));
            // Hacer la publicación publica y visible por cualquiera
            publication.setVisibility(true);

            publicationRepository.save(publication);

        } else {
            throw new UnauthorizedActionException(
                    "The Publication is Not PENDING");
        }
    }

    @Transactional
    public void rejectPublication(Long publicationId) {

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });

        if ("PENDING".equals(publication.getAuthorizationStatus().getState())) {
            // Asignar el estado (3) "DECLINED" a la publicación
            publication.setAuthorizationStatus(new StateRequest(3L));
            publicationRepository.save(publication);

        } else {
            throw new UnauthorizedActionException(
                    "The Publication is Not PENDING");
        }
    }

    @Transactional
    public Vote toggleVote(Long publicationId, String userEmail) {

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException("Holi soy un error") {
                });

        User user = userService.findByEmail(userEmail);

        VoteAndPublicationDTO voteDTO = voteService.votePublication(user, publication);

        // Guardar la publicación con el puntaje actualizado
        publicationRepository.save(voteDTO.getPublication());

        return voteDTO.getVote();

    }

    @Transactional
    public PublicationFilterDTO getPublicationsByLike(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Buscar si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        pag = (pag == 1) ? 0 : ((pag - 1) * 15);
        List<Publication> publications = publicationRepository.publicationsBylike(pag, pagTop);

        return returnPublicationsWithPagination(publications);
    }

    @Transactional
    public PublicationFilterDTO getPublicationsByUser(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Buscar si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        pag = (pag == 1) ? 0 : ((pag - 1) * 15);
        List<Publication> publications = publicationRepository.publicationsByUser(pag, pagTop);

        return returnPublicationsWithPagination(publications);
    }

    @Transactional
    public PublicationFilterDTO getPublicationsByDate(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Buscar si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        pag = (pag == 1) ? 0 : ((pag - 1) * 15);
        List<Publication> publications = publicationRepository.publicationsByDate(pag, pagTop);

        return returnPublicationsWithPagination(publications);
    }

    @Transactional
    public PublicationFilterDTO getPublicationsByAleatory(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Buscar si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        pag = (pag == 1) ? 0 : ((pag - 1) * 15);
        List<Publication> publications = publicationRepository.publicationsByAleatory(pag, pagTop);

        return returnPublicationsWithPagination(publications);
    }

    @Transactional
    public PublicationFilterDTO getPublicationsByPending(int pag) {

        if (pag < 1) {
            throw new IllegalArgumentException(Constants.PAGE_INVALID);
        }

        int pagTop = 46;

        // Buscar si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        pag = (pag == 1) ? 0 : ((pag - 1) * 15);

        final List<Publication> publications = publicationRepository.publicationsByPending(pag, pagTop);

        if (!publications.isEmpty()) {
            // Calcular número posible de paginaciones que hay en base de datos
            Double paginationDouble = (double) publicationRepository.countPublicationsByPending() / 15;
            int pagination = (int) (Math.ceil(paginationDouble) - 1);

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

        // Buscar si hay 3 paginaciones más adelante de la actual (1 Paginacion = 15)
        pag = (pag == 1) ? 0 : ((pag - 1) * 15);
        List<Publication> publications = publicationRepository.publicationsByQuantity(pag, pagTop);

        return returnPublicationsWithPagination(publications);
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

        Publication publication = publicationRepository.findById(publicationId)
                .orElseThrow(() -> new DataAccessException(Constants.P_NOT_FOUND) {
                });

        // Actualizar el estado de autorización de la publicación a (1L) "PENDING" para
        // ser aprobada por el administrador
        publication.setAuthorizationStatus(new StateRequest(1L));
        publicationRepository.save(publication);

    }

    // Funciones reutilizables:

    private PublicationFilterDTO returnPublicationsWithPagination(List<Publication> publications) {

        if (!publications.isEmpty()) {
            // Calcular número posible de paginaciones que hay en base de datos
            Double paginationDouble = (double) publications.size() / 15;
            int pagination = (int) (Math.ceil(paginationDouble) - 1);

            if (publications.size() > 15) {
                // Enviar solo 15 publicaciones que necesita el front
                publications = publications.subList(0, 15);
            }

            return new PublicationFilterDTO(publications, pagination);

        } else {
            throw new DataAccessException(Constants.PS_NOT_FOUND) {
            };
        }
    }
}
