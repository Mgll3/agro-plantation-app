package com.gardengroup.agroplantationapp.controller;


import java.util.List;
import java.util.Map;


import com.gardengroup.agroplantationapp.repository.PlantationRepository;
import com.gardengroup.agroplantationapp.security.JwtAuthenticationFilter;
import com.gardengroup.agroplantationapp.security.JwtTokenProvider;
import com.gardengroup.agroplantationapp.service.CloudinaryService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gardengroup.agroplantationapp.entities.Publication;
import com.gardengroup.agroplantationapp.service.PublicationService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/publication")

public class PublicationController {
    @Autowired
    PlantationRepository plantationRepository;
    @Autowired
    private PublicationService publicationService;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    @PostMapping("/save")
    public ResponseEntity<?> savePublication(@RequestBody Publication publication, HttpServletRequest request) {
        String Token = jwtAuthenticationFilter.getRequestToken(request);
        String email = jwtTokenProvider.getJwtUser(Token);

        try {
            Publication publicationSaved = publicationService.savePublication(publication, email);
            return new ResponseEntity<>(publicationSaved, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }


    @GetMapping("/email/{email}")
    public ResponseEntity<?> PublicationsByEmail(@PathVariable String email) {
        try {
            List<Publication> publication = publicationService.publicationsByEmail(email);
            return new ResponseEntity<>(publication, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping()
    public ResponseEntity<?> updatePublication(@RequestBody Publication publication) {
        try {
            Publication publicationSaved = publicationService.updatePublication(publication);
            return new ResponseEntity<>(publicationSaved, HttpStatus.OK);
        } catch (Exception e) {
            if (e.getMessage().equals("Publication not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
            }
        }
    }

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


    @PostMapping("/upload")
    public ResponseEntity<Map> upload(@RequestParam("image") MultipartFile file, @RequestParam("folder") String folder) {
        try {
            Map result = cloudinaryService.upload(file, folder);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
        }
    }


}




