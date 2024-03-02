package com.gardengroup.agroplantationapp.controller;

import com.gardengroup.agroplantationapp.entity.ProducerRequest;

import com.gardengroup.agroplantationapp.exceptions.OurException;
import com.gardengroup.agroplantationapp.service.AdminService;

import io.swagger.v3.oas.annotations.Operation;
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
            adminService.approveProducerRequest(producerRequestId);
            return ResponseEntity.ok("La solicitud del productor ha sido aprobada con éxito.");
        } catch (OurException e) {
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
            adminService.rejectProducerRequest(producerRequestId);
            return ResponseEntity.ok("La solicitud del productor ha sido rechazada con éxito.");
        } catch (OurException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al rechazar la solicitud del productor: " + e.getMessage());
        }
    }
}

