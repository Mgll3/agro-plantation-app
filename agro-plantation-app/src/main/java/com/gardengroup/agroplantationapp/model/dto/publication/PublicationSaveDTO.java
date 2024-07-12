package com.gardengroup.agroplantationapp.model.dto.publication;

import com.gardengroup.agroplantationapp.model.entity.Plantation;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PublicationSaveDTO {

    @NotBlank(message = "Title is mandatory")
    private String title;

    @NotNull(message = "Plantation is mandatory")
    private Plantation plantation;

}
