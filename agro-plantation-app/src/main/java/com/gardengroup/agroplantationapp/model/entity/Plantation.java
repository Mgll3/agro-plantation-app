package com.gardengroup.agroplantationapp.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Plantation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 20 , nullable = false)
    private String plantType;
    @Column(length = 10 , nullable = false)
    private String seasson;
    @Column(length = 10 , nullable = false)
    private Integer waterAmount;
    @Column(length = 300 , nullable = false)
    private String details;

}
