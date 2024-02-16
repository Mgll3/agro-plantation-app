package com.gardengroup.agroplantationapp.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name ="user_type")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class UserType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 15 , nullable = false)
    private String type;
}
