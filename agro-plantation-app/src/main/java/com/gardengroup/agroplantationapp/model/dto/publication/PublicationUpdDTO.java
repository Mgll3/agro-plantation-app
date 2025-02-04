package com.gardengroup.agroplantationapp.model.dto.publication;

import com.gardengroup.agroplantationapp.model.entity.Plantation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PublicationUpdDTO {

    @NotNull(message = "El ID no puede ser nulo.")
    private Long id;
    @NotBlank(message = "El título es obligatorio.")
    private String title;
    @NotNull(message = "La plantación es obligatoria.")
    private Plantation plantation;
    private Boolean visibility;
}
