package com.gardengroup.agroplantationapp.dtos;

import lombok.Data;

@Data
public class DtoRegistrer {
    private String email;
    private String password;
    private String name;
    private String lastname;
    private String address;


    public DtoRegistrer(String email, String name) {
        this.email = email;

        this.name = name;
    }
}
