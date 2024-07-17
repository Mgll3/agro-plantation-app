package com.gardengroup.agroplantationapp.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Plantation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 15 , nullable = false)
    private String area;
    @Column(length = 25 , nullable = false)
    private String harvestType;
    @Column(length = 25 , nullable = false)
    private String irrigationType;
    @Column(length = 25 , nullable = false)
    private String productionType;
    @Column(length = 3000 , nullable = false)
    private String details;
    @Column(length = 50, nullable = false)
    private String address;

}
