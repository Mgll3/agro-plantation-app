package com.gardengroup.agroplantationapp.model.dto.user;

import lombok.Data;

@Data//lombok get y set
public class LoginDTO {
    private String email;
    private String password;
}
