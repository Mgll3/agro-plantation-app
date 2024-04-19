package com.gardengroup.agroplantationapp.controller;

import java.util.List;

import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationUpdDTO;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.Vote;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.gardengroup.agroplantationapp.service.PublicationService;
import com.gardengroup.agroplantationapp.service.SecurityService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;


@RestController
@RequestMapping("/v1/publication")
@CrossOrigin(origins = "*")
public class PublicationController {
    @Autowired
    private PublicationService publicationService;
    @Autowired
    private SecurityService securityService;

    @Operation(summary = "Guardar publicación",
            description = "End Point para guardar una nueva publicación en base de datos", tags = {"Publication"})
    @Parameter(name = "Publication", description = "Objeto Publication que se guardará en base de datos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Publicación guardada exitosamente"),
            @ApiResponse(responseCode = "501", description = "Error al guardar la publicación")
    })
    @PostMapping("/save")
    public ResponseEntity<?> savePublication(@RequestBody PublicationSaveDTO publication, HttpServletRequest request) {
        try {
            String email = securityService.getEmail(request);
            Publication publicationSaved = publicationService.savePublication(publication, email);
            return new ResponseEntity<>(publicationSaved, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @Operation(summary = "Guardar las imágenes de una publicacion ya creada",
            description = "End Point para subir imagenes a la nube", tags = {"Publication"})
    @Parameter(name = "mainImage", description = "Imagen principal que se va a guardar")
    @Parameter(name = "images", description = "Lista de imagenes secundarias que se van a guardar")
    @Parameter(name = "publicationId", description = "Id de la publicación a la que se le van a asociar las imagenes")
    @PostMapping("/saveImages")
    public ResponseEntity<?> saveImages(
            @RequestParam("images") List<MultipartFile> files,
            @RequestParam("publicationId") Long publicationId,
            @RequestParam("mainImage") MultipartFile mainFile) {
        try {

            publicationService.saveImages(mainFile, files, publicationId);

            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
        }
    }

    @Operation(summary = "Obtener una publicación",
            description = "End Point para obtener una publicación por su id", tags = {"Publication"})
    @Parameter(name = "id", description = "Id de la publicación que se desea obtener")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicación obtenida exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error al obtener la publicación")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getPublication(@PathVariable Long id) {
        try {
            Publication publication = publicationService.getPublication(id);
            return new ResponseEntity<>(publication, HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("Publication not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }


    @Operation(summary = "Obtener publicaciones por email",
            description = "End Point para obtener todas las publicaciones asociadas a un email de usuario",
            tags = {"Publication"})
    @Parameter(name = "email", description = "Email del usuario que se desea obtener sus publicaciones")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicaciones obtenidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicaciones no encontradas"),
            @ApiResponse(responseCode = "500", description = "Error al obtener las publicaciones")
    })
    @GetMapping("/email/{email}")
    public ResponseEntity<?> PublicationsByEmail(@PathVariable String email) {
        try {
            List<Publication> publication = publicationService.publicationsByEmail(email);
            return new ResponseEntity<>(publication, HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("Publications not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }


    @Operation(summary = "Actualizar Publicación existente",
            description = "Modificar los datos de una publicación ya existente", tags = "Publication")
    @Parameter(name = "Publication",
            description = "Publicación que va ser actualizada, unicamente se actualizan los campos title, plantation y visibility")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicación actualizada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada"),
            @ApiResponse(responseCode = "304", description = "Error al actualizar la publicación, No se modificó ningún campo")
    })
    @PutMapping()
    public ResponseEntity<?> updatePublication(@RequestBody PublicationUpdDTO publicationUpdDTO) {
        try {
            publicationService.updatePublication(publicationUpdDTO);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            if (e.getMessage().equals("Publication not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
            }
        }
    }

    @Operation(summary = "Eliminar Publicacion",
            description = "Eliminar todos los datos de una Publicación por su Id", tags = "Publication")
    @Parameter(name = "id", description = "Id de la publicación que se desea eliminar")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Publicación eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada"),
            @ApiResponse(responseCode = "501", description = "Error interno al eliminar la publicación")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<?> deletePublication(@PathVariable Long id) {
        try {
            publicationService.deletePublication(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            if (e.getMessage().equals("Publication not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
            }
        }
    }

    @Operation(summary = "Actualizar visibilidad de una publicación",
            description = "Endpoint para actualizar la visibilidad de una publicación por su ID", tags = {"Publication"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Visibilidad actualizada correctamente",
                    content = @Content(schema = @Schema(implementation = Publication.class))),
            @ApiResponse(responseCode = "401", description = "No autorizado - El usuario no tiene permisos para actualizar la visibilidad"),
            @ApiResponse(responseCode = "404", description = "No encontrado - La publicación con el ID proporcionado no existe"),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PutMapping("/updateVisibility/{publicationId}")
    public ResponseEntity<?> updateVisibility(@PathVariable Long publicationId, HttpServletRequest request) {

        try {
            String email = securityService.getEmail(request);
            Publication updatedPublication = publicationService.updateVisibility(publicationId, email);

            if (updatedPublication != null) {
                return new ResponseEntity<>(updatedPublication, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @Operation(summary = "Obtener las publicaciones principales",
            description = "Endpoint para obtener las publicaciones más populares o mejor valoradas", tags = {"Publication"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al obtener las publicaciones principales",
                    content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "204", description = "No hay publicaciones para mostrar"),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("publications/top")
    public ResponseEntity<List<Publication>> getTopPublications() {
        List<Publication> topPublications = publicationService.getTopPublications();
        return new ResponseEntity<>(topPublications, HttpStatus.OK);
    }

    @Operation(summary = "Alternar voto para una publicación",
            description = "Endpoint para alternar el voto (me gusta/no me gusta) para una publicación específica", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Voto alternado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/publications/toggleVote/{publicationId}")
    public ResponseEntity<?> toggleVote(@PathVariable Long publicationId, HttpServletRequest request) {
        try {
            String email = securityService.getEmail(request);
            Vote vote = publicationService.toggleVote(publicationId, email);
            return ResponseEntity.status(HttpStatus.CREATED).body(vote);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Obtener publicaciones pendientes", 
        description = "Endpoint para obtener las publicaciones pendientes", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al obtener las publicaciones pendientes",
                    content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "204", description = "No hay publicaciones pendientes para mostrar"),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/pendingPublications")
    public ResponseEntity<List<Publication>> getPendingPublications() {
        List<Publication> pendingPublications = publicationService.pendingPublications();
        return ResponseEntity.ok(pendingPublications);
    }

    @Operation(summary = "Aprobar publicación", 
        description = "Endpoint para aprobar una solicitud de publicación", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al aprobar la publicación"),
            @ApiResponse(responseCode = "400", description = "Error al procesar la solicitud")
    })
    @PutMapping("/approvePublication/{publicationId}")
    public ResponseEntity<?> approvePublication(@PathVariable Long publicationId) {
        try {
            publicationService.approvePublication(publicationId);
            return ResponseEntity.ok("La solicitud de publicación ha sido aprobada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al aprobar la solicitud de publicación");
        }
    }

    @Operation(summary = "Rechazar publicación", 
        description = "Endpoint para rechazar una solicitud de publicación", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al rechazar la publicación"),
            @ApiResponse(responseCode = "400", description = "Error al procesar la solicitud")
    })
    @PutMapping("/rejectPublication/{publicationId}")
    public ResponseEntity<?> rejectPublication(@PathVariable Long publicationId) {
        try {
            publicationService.rejectPublication(publicationId);
            return ResponseEntity.ok("La solicitud de publicación ha sido rechazada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al rechazar la solicitud de publicación");
        }
    }

    @GetMapping("/like/{pag}")
    public ResponseEntity<List<Publication>> getPublicationsByLike(@PathVariable int pag) {
        try {
            List<Publication> publications = publicationService.getPublicationsByLike(pag);
            return new ResponseEntity<>(publications, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            if (e.getMessage().equals("Publications not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

}









