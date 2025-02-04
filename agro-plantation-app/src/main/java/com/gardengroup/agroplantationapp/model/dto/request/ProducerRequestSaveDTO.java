package com.gardengroup.agroplantationapp.model.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import jakarta.validation.constraints.Size;



@Data
public class ProducerRequestSaveDTO {

    @NotNull(message = "El nombre del jardín es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre del jardín debe tener entre 3 y 100 caracteres")
    private String gardenName;

    @NotNull(message = "El tamaño del jardín es obligatorio")
    @Pattern(regexp = "^[0-9]+(\\.[0-9]+)?$", message = "El tamaño del jardín debe ser un número válido (puede incluir decimales)")
    private String gardenSize;

    @NotNull(message = "La dirección del jardín es obligatoria")
    @Size(min = 5, max = 255, message = "La dirección debe tener entre 5 y 255 caracteres")
    private String gardenAddress;

    @Size(max = 500, message = "La descripción no puede tener más de 500 caracteres")
    private String description;
    
}
