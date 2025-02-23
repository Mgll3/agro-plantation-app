package com.gardengroup.agroplantationapp.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name ="user_type")
@Data
public class UserType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 15 , nullable = false)
    private String type;

    public UserType() {
    }

    public UserType(Long id){
        this.id = id;
    }
}
