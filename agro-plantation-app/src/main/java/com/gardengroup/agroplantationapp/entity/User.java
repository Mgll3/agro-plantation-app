/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gardengroup.agroplantationapp.entity;


import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author sofia
 */
//lombok genera un constructor sin elementos
@Entity
@Table(name ="user")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30 , nullable = false)
    private String name;

    @Column(length = 30 , nullable = false)
    private String lastname;


    @Column(length = 30, nullable = false)
    private String email;

    @Column(length = 50, nullable = false)
    private String address;

    @Column(name = "password", length = 100 , nullable = false)
    private String password;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean totalAuthorization;

    @ManyToOne
    private UserType userType;


}
