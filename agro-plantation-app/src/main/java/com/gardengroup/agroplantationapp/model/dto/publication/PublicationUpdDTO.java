package com.gardengroup.agroplantationapp.model.dto.publication;

import com.gardengroup.agroplantationapp.model.entity.Plantation;

import lombok.Data;

@Data
public class PublicationUpdDTO {
    private Long id;
    private String title;
    private Plantation plantation;
    private Boolean visibility;
}
