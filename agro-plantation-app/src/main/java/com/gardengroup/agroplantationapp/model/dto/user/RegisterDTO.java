package com.gardengroup.agroplantationapp.model.dto.user;

import lombok.AllArgsConstructor;
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
    
    public RegisterDTO(String email, String password, String name, String lastname, String address) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.address = address;
    }
}
