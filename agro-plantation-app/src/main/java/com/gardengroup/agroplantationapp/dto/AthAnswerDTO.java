package com.gardengroup.agroplantationapp.dto;

import lombok.Data;

/**
 * Clase para representar la respuesta de autenticación.
 */
@Data
public class AthAnswerDTO {
    private String accessToken;
    private String tokenType ="Beader ";

    public  AthAnswerDTO(String accessToken ){
        this.accessToken = accessToken;

    }
}
