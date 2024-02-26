package com.gardengroup.agroplantationapp.dto;

import com.gardengroup.agroplantationapp.entity.Plantation;
import com.gardengroup.agroplantationapp.entity.User;

import lombok.Data;

@Data
public class PublicationSaveDTO {
    private String title;
    private Plantation plantation;
    private User author;
    private boolean visibility;
    private int score;
}
