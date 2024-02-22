package com.gardengroup.agroplantationapp.dtos;

import lombok.Data;

/**
 * Clase para representar la respuesta de autenticación.
 */
@Data
public class DtoAthAnswer {
    private String accessToken;
    private String tokenType ="Beader ";

    public  DtoAthAnswer(String accessToken ){
        this.accessToken = accessToken;

    }
}
