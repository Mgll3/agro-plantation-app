package com.gardengroup.agroplantationapp.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Image {
    @Id
    private String id;
    @Column(length = 120, nullable = false)
    private String url;

    
    public Image() {
    }

    public Image(String id, String url) {
        this.id = id;
        this.url = url;
    }
}
