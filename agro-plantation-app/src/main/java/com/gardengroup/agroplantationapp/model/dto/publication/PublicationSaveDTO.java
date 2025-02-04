package com.gardengroup.agroplantationapp.model.dto.publication;

import com.gardengroup.agroplantationapp.model.entity.Plantation;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PublicationSaveDTO {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 50, message = "El título no puede superar los 50 caracteres.")
    private String title;

    @NotNull(message = "Plantation is mandatory")
    private Plantation plantation;

}
