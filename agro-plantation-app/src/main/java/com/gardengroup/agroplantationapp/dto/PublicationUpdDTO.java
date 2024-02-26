package com.gardengroup.agroplantationapp.dto;

import com.gardengroup.agroplantationapp.entity.Plantation;

import lombok.Data;

@Data
public class PublicationUpdDTO {
    private Long id;
    private String title;
    private Plantation plantation;
    private Boolean visibility;
}
