package com.gardengroup.agroplantationapp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gardengroup.agroplantationapp.entities.Publication;
import com.gardengroup.agroplantationapp.service.PublicationService;

@RestController
@RequestMapping ("/publication")
@CrossOrigin(origins = "*")
public class PublicationController {
    
    @Autowired
    private PublicationService publicationService;

    @PostMapping("/save")
    public ResponseEntity<?> savePublication(@RequestBody Publication publication) {
        System.out.println(publication.toString());
        try {
            Publication publicationSaved = publicationService.savePublication(publication);
            return new ResponseEntity<>(publicationSaved, HttpStatus.CREATED);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
        }
        
    }


}
