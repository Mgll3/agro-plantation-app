package com.gardengroup.agroplantationapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gardengroup.agroplantationapp.model.dto.publication.*;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.Vote;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.gardengroup.agroplantationapp.service.interfaces.IPublicationService;
import com.gardengroup.agroplantationapp.service.implementation.SecurityService;
import com.gardengroup.agroplantationapp.utils.Constants;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/v1/publication")
@CrossOrigin(origins = "*")
@Slf4j
public class PublicationController {
    @Autowired
    private IPublicationService publicationService;
    @Autowired
    private SecurityService securityService;

    @Operation(summary = "Guardar publicación", description = "End Point para guardar una nueva publicación en base de datos, con Token", tags = {
            "Publication" })
    @Parameter(name = "Publication", description = "Objeto Publication que se guardará en base de datos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Publicación guardada exitosamente"),
            @ApiResponse(responseCode = "501", description = "Error al guardar la publicación"),
            @ApiResponse(responseCode = "401", description = "Email no autorizado para crear publicaciones"),
            @ApiResponse(responseCode = "400", description = "Error de validación en los campos de la publicación")
    })
    @PostMapping("/save")
    public ResponseEntity<Publication> savePublication(@Valid @RequestBody PublicationSaveDTO publication,
            HttpServletRequest request) {
        try {
            String email = securityService.getEmail(request);
            // Validar si existe correo
            if (email == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            Publication publicationSaved = publicationService.savePublication(publication, email);
            return new ResponseEntity<>(publicationSaved, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @Operation(summary = "Guardar las imágenes de una publicacion ya creada", description = "End Point para subir imagenes a la nube", tags = {
            "Publication" })
    @Parameter(name = "mainImage", description = "Imagen principal que se va a guardar")
    @Parameter(name = "images", description = "Lista de imagenes secundarias que se van a guardar")
    @Parameter(name = "publicationId", description = "Id de la publicación a la que se le van a asociar las imagenes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Imagenes guardadas exitosamente"),
            @ApiResponse(responseCode = "501", description = "Error al guardar las imagenes"),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada")
    })
    @PostMapping("/saveImages")
    public ResponseEntity<Void> saveImages(
            @RequestParam("images") List<MultipartFile> files,
            @RequestParam("publicationId") Long publicationId,
            @RequestParam("mainImage") MultipartFile mainFile) {
        try {

            publicationService.saveImages(mainFile, files, publicationId);

            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.P_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
            }
        }
    }

    @Operation(summary = "Actualizar visibilidad de una publicación", description = "Endpoint para actualizar la visibilidad de una publicación por su ID", tags = {
            "Publication" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Visibilidad actualizada correctamente", content = @Content(schema = @Schema(implementation = Publication.class))),
            @ApiResponse(responseCode = "401", description = "No autorizado - El usuario no tiene permisos para actualizar la visibilidad"),
            @ApiResponse(responseCode = "404", description = "No encontrado - La publicación con el ID proporcionado no existe"),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PutMapping("/updateVisibility/{publicationId}")
    public ResponseEntity<Publication> updateVisibility(@PathVariable Long publicationId, HttpServletRequest request) {
        try {
            String email = securityService.getEmail(request);
            Publication updatedPublication = publicationService.updateVisibility(publicationId, email);

            if (updatedPublication != null) {
                return new ResponseEntity<>(updatedPublication, HttpStatus.OK);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @Operation(summary = "Obtener una publicación", description = "End Point para obtener una publicación por su id", tags = {
            "Publication" })
    @Parameter(name = "id", description = "Id de la publicación que se desea obtener")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicación obtenida exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error al obtener la publicación")
    })
    @GetMapping("/{id}")
    public ResponseEntity<PublicationDTO> getPublication(@PathVariable Long id, HttpServletRequest request) {
        try {
            String email = securityService.getEmail(request);
            PublicationDTO publication = publicationService.getPublication(id, email);
            return new ResponseEntity<>(publication, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.P_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Operation(summary = "Obtener publicaciones por email", description = "End Point para obtener todas las publicaciones asociadas a un email de usuario", tags = {
            "Publication" })
    @Parameter(name = "email", description = "Email del usuario que se desea obtener sus publicaciones")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicaciones obtenidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicaciones no encontradas"),
            @ApiResponse(responseCode = "500", description = "Error al obtener las publicaciones")
    })
    @GetMapping("/email/{email}")
    public ResponseEntity<List<Publication>> publicationsByEmail(@PathVariable String email) {
        try {
            List<Publication> publication = publicationService.publicationsByEmail(email);
            return new ResponseEntity<>(publication, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.PS_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Operation(summary = "Actualizar Publicación existente", description = "Modificar los datos de una publicación ya existente", tags = "Publication")
    @Parameter(name = "Publication", description = "Publicación que va ser actualizada, unicamente se actualizan los campos title, plantation y visibility")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicación actualizada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada"),
            @ApiResponse(responseCode = "304", description = "Error al actualizar la publicación, No se modificó ningún campo")
    })
    @PutMapping()
    public ResponseEntity<Publication> updatePublication(@RequestBody PublicationUpdDTO publicationUpdDTO) {
        try {
            Publication publicationUpdated = publicationService.updatePublication(publicationUpdDTO);
            return new ResponseEntity<>(publicationUpdated, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.P_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
            }
        }
    }

    @Operation(summary = "Eliminar Publicacion", description = "Eliminar todos los datos de una Publicación por su Id", tags = "Publication")
    @Parameter(name = "id", description = "Id de la publicación que se desea eliminar")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Publicación eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada"),
            @ApiResponse(responseCode = "501", description = "Error interno al eliminar la publicación")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        try {
            publicationService.deletePublication(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.P_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
            }
        }
    }

    @Operation(summary = "Obtener las publicaciones principales", description = "Endpoint para obtener las publicaciones más populares o mejor valoradas", tags = {
            "Publication" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al obtener las publicaciones principales", content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "404", description = "No hay publicaciones para mostrar"),
            @ApiResponse(responseCode = "500", description = "Error al procesar la solicitud", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("publications/top")
    public ResponseEntity<List<Publication>> getTopPublications() {
        try {
            List<Publication> topPublications = publicationService.getTopPublications();
            return new ResponseEntity<>(topPublications, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.PS_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Operation(summary = "Alternar voto para una publicación", description = "Endpoint para alternar el voto (me gusta/no me gusta) para una publicación específica, necesita token", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Voto alternado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada"),
            @ApiResponse(responseCode = "501", description = "Error, no se pudo alternar el voto")
    })
    @PostMapping("/toggleVote/{publicationId}")
    public ResponseEntity<Vote> toggleVote(@PathVariable Long publicationId, HttpServletRequest request) {
        try {
            String email = securityService.getEmail(request);
            Vote vote = publicationService.toggleVote(publicationId, email);
            return ResponseEntity.status(HttpStatus.CREATED).body(vote);

        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.P_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
            }
        }
    }

    @Operation(summary = "Obtener publicaciones pendientes", description = "Endpoint para obtener las publicaciones pendientes", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al obtener las publicaciones pendientes", content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "204", description = "No hay publicaciones pendientes para mostrar"),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/pendingPublications")
    public ResponseEntity<List<Publication>> getPendingPublications() {
        List<Publication> pendingPublications = publicationService.pendingPublications();
        return ResponseEntity.ok(pendingPublications);
    }

    @Operation(summary = "Aprobar publicación", description = "Endpoint para aprobar una solicitud de publicación", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al aprobar la publicación"),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud")
    })
    @PutMapping("/approvePublication/{publicationId}")
    public ResponseEntity<String> approvePublication(@PathVariable Long publicationId) {
        try {
            publicationService.approvePublication(publicationId);
            return ResponseEntity.ok("La solicitud de publicación ha sido aprobada con éxito.");
        } catch (Exception e) {
            if (e.getMessage().equals(Constants.P_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
            }
        }
    }

    @Operation(summary = "Rechazar publicación", description = "Endpoint para rechazar una solicitud de publicación", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al rechazar la publicación"),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud")
    })
    @PutMapping("/rejectPublication/{publicationId}")
    public ResponseEntity<String> rejectPublication(@PathVariable Long publicationId) {
        try {
            publicationService.rejectPublication(publicationId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @Operation(summary = "Obtener publicaciones por Likes", description = "End Point para obtener las publicaciónes en orden por más likes, además devuelve como maximo 3, el número de paginaciónes siguientes posibles", tags = {
            "Publication Filters" })
    @Parameter(name = "pag", description = "Numero de Paginación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicaciones obtenidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicaciones no encontradas"),
            @ApiResponse(responseCode = "500", description = "Error al obtener las publicaciones")
    })
    @GetMapping("/like/{pag}")
    public ResponseEntity<PublicationFilterDTO> getPublicationsByLike(@PathVariable int pag) {
        try {
            PublicationFilterDTO publications = publicationService.getPublicationsByLike(pag);
            return new ResponseEntity<>(publications, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.PS_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Operation(summary = "Obtener publicaciones por Usuario", description = "End Point para obtener las publicaciónes en orden alfabetico por usuario, además devuelve como maximo 3, el número de paginaciónes siguientes posibles", tags = {
            "Publication Filters" })
    @Parameter(name = "pag", description = "Numero de Paginación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicaciones obtenidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicaciones no encontradas"),
            @ApiResponse(responseCode = "500", description = "Error al obtener las publicaciones")
    })
    @GetMapping("/user/{pag}")
    public ResponseEntity<PublicationFilterDTO> getPublicationsByUser(@PathVariable int pag) {
        try {
            PublicationFilterDTO publications = publicationService.getPublicationsByUser(pag);
            return new ResponseEntity<>(publications, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.PS_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Operation(summary = "Obtener publicaciones aleatoriamente", description = "End Point para obtener las publicaciónes en orden más recientes por fecha, además devuelve como maximo 3, el número de paginaciónes siguientes posibles", tags = {
            "Publication Filters" })
    @Parameter(name = "pag", description = "Numero de Paginación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicaciones obtenidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicaciones no encontradas"),
            @ApiResponse(responseCode = "500", description = "Error al obtener las publicaciones")
    })
    @GetMapping("/date/{pag}")
    public ResponseEntity<PublicationFilterDTO> getPublicationsByDate(@PathVariable int pag) {
        try {
            PublicationFilterDTO publications = publicationService.getPublicationsByDate(pag);
            return new ResponseEntity<>(publications, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.PS_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Operation(summary = "Obtener publicaciones aleatoriamente", description = "End Point para obtener las publicaciónes de forma aleatoria, además devuelve como maximo 3, el número de paginaciónes siguientes posibles", tags = {
            "Publication Filters" })
    @Parameter(name = "pag", description = "Numero de Paginación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicaciones obtenidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicaciones no encontradas"),
            @ApiResponse(responseCode = "500", description = "Error al obtener las publicaciones")
    })
    @GetMapping("/aleatory/{pag}")
    public ResponseEntity<PublicationFilterDTO> getPublicationsByAleatory(@PathVariable int pag) {
        try {
            PublicationFilterDTO publications = publicationService.getPublicationsByAleatory(pag);
            return new ResponseEntity<>(publications, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.PS_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Operation(summary = "Obtener publicaciones pendientes", description = "End Point para obtener las publicaciónes pendientes de aprobar para ser publicas, además devuelve como maximo 3, el número de paginaciónes siguientes posibles", tags = {
            "Publication Filters" })
    @Parameter(name = "pag", description = "Numero de Paginación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicaciones obtenidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicaciones no encontradas"),
            @ApiResponse(responseCode = "500", description = "Error al obtener las publicaciones")
    })
    @GetMapping("/pending/{pag}")
    public ResponseEntity<PublicationFilterDTO> getPublicationsByPending(@PathVariable int pag) {
        try {

            PublicationFilterDTO publications = publicationService.getPublicationsByPending(pag);

            return new ResponseEntity<>(publications, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.PS_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Operation(summary = "Obtener publicaciones por Usuario y cantidad", description = "End Point para obtener las publicaciónes en orden por usuario con cantidad mayor a menor, además devuelve como maximo 3, el número de paginaciónes siguientes posibles", tags = {
            "Publication Filters" })
    @Parameter(name = "pag", description = "Numero de Paginación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publicaciones obtenidas exitosamente"),
            @ApiResponse(responseCode = "404", description = "Publicaciones no encontradas"),
            @ApiResponse(responseCode = "500", description = "Error al obtener las publicaciones")
    })
    @GetMapping("/userQuantity/{pag}")
    public ResponseEntity<PublicationFilterDTO> getPublicationsByQuantity(@PathVariable int pag) {
        try {
            PublicationFilterDTO publications = publicationService.getPublicationsByQuantity(pag);
            return new ResponseEntity<>(publications, HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.PS_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    // Temporal, cambiar publicacion de estado a pendiente
    @PutMapping("/changeToPending/{publicationId}")
    public ResponseEntity<Void> changeToPending(@PathVariable Long publicationId) {
        try {
            publicationService.changeToPending(publicationId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            if (e.getMessage().equals(Constants.P_NOT_FOUND)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
            }
        }
    }

    @Operation(summary = "Solicitar aprobación de una publicación", description = "Endpoint para que el autor de una publicación solicite su aprobación", tags = "Publication")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitud de aprobación enviada con éxito."),
            @ApiResponse(responseCode = "404", description = "Publicación no encontrada."),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud.")
    })
    @PostMapping("/{publicationId}/requestApproval")
    public ResponseEntity<String> requestApproval(@PathVariable Long publicationId, HttpServletRequest request) {
        try {
            // 1. Obtener el email del usuario desde la solicitud utilizando el servicio de
            // seguridad
            String email = securityService.getEmail(request);
            // 2. Llamar al servicio para solicitar la aprobación de la publicación
            publicationService.requestApproval(publicationId, email);
            // 3. Retornar una respuesta exitosa si la solicitud se procesó correctamente
            return ResponseEntity.ok("Solicitud de aprobación enviada con éxito.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    // Manejo de errores de validación
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.badRequest().body(errors);
    }

}
