package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.model.dto.request.ProducerRequestSaveDTO;
import com.gardengroup.agroplantationapp.model.entity.ProducerRequest;
import com.gardengroup.agroplantationapp.service.interfaces.IProducerRequestService;
import com.gardengroup.agroplantationapp.service.implementation.SecurityService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/v1/producerRequest")
@Slf4j
public class ProducerRequestController {

    @Autowired
    private IProducerRequestService producerRequestService;
    @Autowired
    private SecurityService securityService;

    @Operation(summary = "Obtiene las solicitudes de productores pendientes", description = "Este endpoint devuelve la lista de solicitudes de productores pendientes", tags = {
            "ProducerRequest" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al obtener las solicitudes de productores pendientes"),
            @ApiResponse(responseCode = "500", description = "Error en el servidor al obtener las solicitudes de productores pendientes")
    })
    @GetMapping("/pending")
    public ResponseEntity<List<ProducerRequest>> getProducerRequests() {
        try {
            List<ProducerRequest> producerRequests = producerRequestService.getPendingProducerRequests();
            return ResponseEntity.ok(producerRequests);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Aprueba una solicitud de productor", description = "Este endpoint permite aprobar una solicitud de productor pendiente, Admin", tags = {
            "ProducerRequest" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al aprobar la solicitud del productor"),
            @ApiResponse(responseCode = "501", description = "Error al aprobar la solicitud del productor")
    })
    // @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/approve/{producerRequestId}")
    public ResponseEntity<Void> approveProducerRequest(@PathVariable Long producerRequestId) {
        try {
            producerRequestService.approve(producerRequestId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @Operation(summary = "Rechaza una solicitud de productor", description = "Este endpoint permite rechazar una solicitud de productor", tags = {
            "ProducerRequest" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Éxito al rechazar la solicitud del productor"),
            @ApiResponse(responseCode = "501", description = "Error al rechazar la solicitud del productor")
    })
    @PostMapping("/reject/{producerRequestId}")
    public ResponseEntity<Void> rejectProducerRequest(@PathVariable Long producerRequestId) {
        try {
            producerRequestService.reject(producerRequestId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @Operation(summary = "Solicitar ser productor", description = "Endpoint para solicitar ser productor", tags = {
            "ProducerRequest" })
    @Parameter(name = "ProducerRequest", description = "Solicitud de productor")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Solicitud creada con éxito", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "501", description = "Solicitud incorrecta - Error al crear la solicitud", content = @Content(schema = @Schema(implementation = String.class)))
    })
    @PostMapping("/send")
    public ResponseEntity<ProducerRequest> requestToBecomeProducer(HttpServletRequest request,
            @RequestBody ProducerRequestSaveDTO producerRequest) {
        try {
            String email = securityService.getEmail(request);
            ProducerRequest requestSaved = producerRequestService.sendProducerRequest(email, producerRequest);
            return new ResponseEntity<>(requestSaved, HttpStatus.CREATED);

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

}
