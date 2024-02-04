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
import com.gardengroup.agroplantationapp.service.CloudinaryService;
import com.gardengroup.agroplantationapp.service.PublicationService;

@RestController
@RequestMapping ("/v1/publication")
public class PublicationController {
    
    @Autowired
    private PublicationService publicationService;
    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/save")
    public ResponseEntity<?> savePublication(@RequestBody Publication publication) {
        try {
            Publication publicationSaved = publicationService.savePublication(publication);
            return new ResponseEntity<>(publicationSaved, HttpStatus.CREATED);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPublication(@PathVariable Long id){
        try {
            Publication publication = publicationService.getPublication(id);
            return new ResponseEntity<>(publication, HttpStatus.OK);
        } catch (Exception e) {
            //responder con un mensaje de error recibido del services
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> PublicationsByEmail(@PathVariable String email) {
        try {
            List<Publication> publication = publicationService.publicationsByEmail(email);
            return new ResponseEntity<>(publication, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

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
