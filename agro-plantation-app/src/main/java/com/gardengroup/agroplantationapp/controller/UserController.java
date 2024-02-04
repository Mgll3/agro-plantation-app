package com.gardengroup.agroplantationapp.controller;



import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gardengroup.agroplantationapp.entities.User;
import com.gardengroup.agroplantationapp.service.UserService;

@RestController
@RequestMapping ("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/authorization")
    public ResponseEntity<User> authorization(@RequestBody User user) {
        User userAuth = userService.authorization(user.getEmail());
        if (userAuth != null) {
            return ResponseEntity.ok(userAuth);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}


