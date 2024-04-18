package com.gardengroup.agroplantationapp.model.dto.publication;

import com.gardengroup.agroplantationapp.model.entity.Plantation;

import lombok.Data;

@Data
public class PublicationSaveDTO {
    private String title;
    private Plantation plantation;
    private boolean visibility;
    private int score;
}
