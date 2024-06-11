package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.model.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.service.IProducerRequestService;
import com.gardengroup.agroplantationapp.service.SecurityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin(origins = "*")
public class ProducerRequestController {
    
    @Autowired
    private IProducerRequestService ProducerRequestService;
    @Autowired
    private SecurityService securityService;

    @Operation(
            summary = "Obtiene las solicitudes de productores pendientes",
            description = "Este endpoint devuelve la lista de solicitudes de productores pendientes",
            tags = {"ProducerRequest"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al obtener las solicitudes de productores pendientes"),
            @ApiResponse(responseCode = "500", description = "Error en el servidor al obtener las solicitudes de productores pendientes")
    })
    @GetMapping("/producerRequests")
    public ResponseEntity<?> getProducerRequests() {
        try {
            List<ProducerRequest> producerRequests = ProducerRequestService.getPendingProducerRequests();
            return ResponseEntity.ok(producerRequests);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor" );
        }
    }

    @Operation(
            summary = "Aprueba una solicitud de productor",
            description = "Este endpoint permite aprobar una solicitud de productor pendiente, Admin",
            tags = {"ProducerRequest"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al aprobar la solicitud del productor"),
            @ApiResponse(responseCode = "400", description = "Error al aprobar la solicitud del productor")
    })
    //@PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/approveProducerRequest/{producerRequestId}")
    public ResponseEntity<?> approveProducerRequest(@PathVariable Long producerRequestId) {
        try {
            ProducerRequestService.approve(producerRequestId);
            return ResponseEntity.ok("La solicitud del productor ha sido aprobada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al aprobar la solicitud del productor" );
        }
    }

    @Operation(
            summary = "Rechaza una solicitud de productor",
            description = "Este endpoint permite rechazar una solicitud de productor",
            tags = {"ProducerRequest"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al rechazar la solicitud del productor"),
            @ApiResponse(responseCode = "400", description = "Error al rechazar la solicitud del productor")
    })
    @PostMapping("/rejectProducerRequest/{producerRequestId}")
    public ResponseEntity<?> rejectProducerRequest(@PathVariable Long producerRequestId) {
        try {
            ProducerRequestService.reject(producerRequestId);
            return ResponseEntity.ok("La solicitud del productor ha sido rechazada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al rechazar la solicitud del productor");
        }
    }

    @Operation(summary = "Solicitar ser productor", description = "Endpoint para solicitar ser productor", tags = {"Producer"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitud creada con éxito",
                    content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Solicitud incorrecta - Error al crear la solicitud",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PostMapping("/requestProducer")
    public ResponseEntity<?> requestToBecomeProducer(HttpServletRequest request) {
        try {
            String email = securityService.getEmail(request);
            ProducerRequestService.sendProducerRequest(email);
            return ResponseEntity.ok("Solicitud para convertirse en productor creada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear la solicitud: ");
        }
    }

}
