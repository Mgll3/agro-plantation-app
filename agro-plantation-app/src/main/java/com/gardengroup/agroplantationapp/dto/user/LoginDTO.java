package com.gardengroup.agroplantationapp.dto.user;

import lombok.Data;

@Data//lombok get y set
public class LoginDTO {
    private String email;
    private String password;
}
