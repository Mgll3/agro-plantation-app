package com.gardengroup.agroplantationapp.dto;

import lombok.Data;

@Data
public class RegisterDTO {
    private String email;
    private String password;
    private String name;
    private String lastname;
    private String address;


    public RegisterDTO(String email, String name) {
        this.email = email;

        this.name = name;
    }
}
