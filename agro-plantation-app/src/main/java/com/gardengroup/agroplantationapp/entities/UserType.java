package com.gardengroup.agroplantationapp.entities;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Table(name ="user_type")
@Data
public class UserType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 15)
    private String type;
}
