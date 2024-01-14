/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.gardengroup.agroplantationapp.entities;

import com.gardengroup.agroplantationapp.enumerations.Usertype;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 *
 * @author sofia
 */
@Entity
@Table(name ="user")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    private String lastname;
    private String email;
    private String address;
    private String password;

    @Enumerated(EnumType.STRING)
    private Usertype usertype;
    
}
