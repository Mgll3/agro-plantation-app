package com.gardengroup.agroplantationapp.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.gardengroup.agroplantationapp.entities.Publication;
import com.gardengroup.agroplantationapp.service.PublicationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping ("/v1/publication")
@CrossOrigin(origins = "*")
public class PublicationController {
    
    @Autowired
    private PublicationService publicationService;

    @Operation(summary = "Guardar publicación", 
        description = "End Point para guardar una nueva publicación en base de datos", tags = {"Publication"})
    @Parameter(name = "Publication", description = "Objeto Publication que se guardará en base de datos")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Publicación guardada exitosamente"),
        @ApiResponse(responseCode = "501", description = "Error al guardar la publicación")
    })
    @PostMapping("/save")
    public ResponseEntity<Publication> savePublication(@RequestBody Publication publication) {
        try {
            Publication publicationSaved = publicationService.savePublication(publication);
            return new ResponseEntity<>(publicationSaved, HttpStatus.CREATED);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @PostMapping("/saveImages")
    public ResponseEntity<?> saveImages(
        @RequestParam("images") List<MultipartFile> files,
        @RequestParam("publicationId") Long publicationId,
        @RequestParam("mainImage") MultipartFile mainFile) {
        try {
            
            publicationService.saveImages(mainFile, files, publicationId);
            
            return new ResponseEntity<>(HttpStatus.OK);
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
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
    public ResponseEntity<?> getPublication(@PathVariable Long id){
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
        description = "End Point para obtener todas las publicaciones asociadas a un email del usuario", 
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
        }catch (Exception e){
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
    public ResponseEntity<?> updatePublication(@RequestBody Publication publication) {
        try {
            Publication publicationSaved = publicationService.updatePublication(publication);
            return new ResponseEntity<>(publicationSaved, HttpStatus.OK);
        }catch (Exception e){
            if (e.getMessage().equals("Publication not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_MODIFIED);
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
        }catch (Exception e){
            if (e.getMessage().equals("Publication not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
            }
        }
    }

    

}
