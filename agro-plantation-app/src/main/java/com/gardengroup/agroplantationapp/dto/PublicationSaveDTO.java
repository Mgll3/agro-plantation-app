package com.gardengroup.agroplantationapp.dto;

import com.gardengroup.agroplantationapp.entity.Plantation;

import lombok.Data;

@Data
public class PublicationSaveDTO {
    private String title;
    private Plantation plantation;
    private boolean visibility;
    private int score;
}
