package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.model.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.service.AdminService;

import com.gardengroup.agroplantationapp.service.PublicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private PublicationService publicationService;


    @Operation(
            summary = "Obtiene las solicitudes de productores pendientes",
            description = "Este endpoint devuelve la lista de solicitudes de productores pendientes",
            tags = {"Admin"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al obtener las solicitudes de productores pendientes"),
            @ApiResponse(responseCode = "500", description = "Error en el servidor al obtener las solicitudes de productores pendientes")
    })
    @GetMapping("/producer-requests")
    public ResponseEntity<?> getProducerRequests() {
        try {
            List<ProducerRequest> producerRequests = adminService.getPendingProducerRequests();
            return ResponseEntity.ok(producerRequests);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor: " + e.getMessage());
        }
    }


    @Operation(
            summary = "Aprueba una solicitud de productor",
            description = "Este endpoint permite aprobar una solicitud de productor",
            tags = {"Admin"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al aprobar la solicitud del productor"),
            @ApiResponse(responseCode = "400", description = "Error al aprobar la solicitud del productor")
    })
    //@PreAuthorize("hasRole('ADMIN')")

    @PostMapping("/approve-producer-request/{producerRequestId}")
    public ResponseEntity<?> approveProducerRequest(@PathVariable Long producerRequestId) {
        try {
            adminService.approve(producerRequestId);
            return ResponseEntity.ok("La solicitud del productor ha sido aprobada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al aprobar la solicitud del productor: " + e.getMessage());
        }
    }


    @Operation(
            summary = "Rechaza una solicitud de productor",
            description = "Este endpoint permite rechazar una solicitud de productor",
            tags = {"Admin"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al rechazar la solicitud del productor"),
            @ApiResponse(responseCode = "400", description = "Error al rechazar la solicitud del productor")
    })
    @PostMapping("/reject-producer-request/{producerRequestId}")
    public ResponseEntity<?> rejectProducerRequest(@PathVariable Long producerRequestId) {
        try {
            adminService.reject(producerRequestId);
            return ResponseEntity.ok("La solicitud del productor ha sido rechazada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al rechazar la solicitud del productor: " + e.getMessage());
        }
    }


    @Operation(summary = "Obtener publicaciones pendientes", description = "Endpoint para obtener las publicaciones pendientes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al obtener las publicaciones pendientes",
                    content = @Content(schema = @Schema(implementation = List.class))),
            @ApiResponse(responseCode = "204", description = "No hay publicaciones pendientes para mostrar"),
            @ApiResponse(responseCode = "501", description = "Error al procesar la solicitud",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/pending-publications")
    public ResponseEntity<List<Publication>> getPendingPublications() {
        List<Publication> pendingPublications = publicationService.pendingPublications();
        return ResponseEntity.ok(pendingPublications);
    }
    @Operation(summary = "Aprobar publicación", description = "Endpoint para aprobar una solicitud de publicación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al aprobar la publicación"),
            @ApiResponse(responseCode = "400", description = "Error al procesar la solicitud")
    })
    @PutMapping("/approvePublication/{publicationId}")
    public ResponseEntity<?> approvePublication(@PathVariable Long publicationId) {
        try {
            publicationService.approve(publicationId);
            return ResponseEntity.ok("La solicitud de publicación ha sido aprobada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al aprobar la solicitud de publicación: " + e.getMessage());
        }
    }
    @Operation(summary = "Rechazar publicación", description = "Endpoint para rechazar una solicitud de publicación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al rechazar la publicación"),
            @ApiResponse(responseCode = "400", description = "Error al procesar la solicitud")
    })
    @PutMapping("/rejectPublication/{publicationId}")
    public ResponseEntity<?> rejectPublication(@PathVariable Long publicationId) {
        try {
            publicationService.reject(publicationId);
            return ResponseEntity.ok("La solicitud de publicación ha sido rechazada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al rechazar la solicitud de publicación: " + e.getMessage());
        }
    }
}

