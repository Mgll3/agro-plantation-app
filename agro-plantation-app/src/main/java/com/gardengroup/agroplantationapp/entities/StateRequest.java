package com.gardengroup.agroplantationapp.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StateRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 10)
    private String state;

    public StateRequest() {
    }
    
    public StateRequest(Long id) {
        this.id = id;
    }
}
