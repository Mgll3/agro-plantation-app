package com.gardengroup.agroplantationapp.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name ="user")
@Data
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

    @ManyToOne
    @JoinColumn(nullable = false)
    private UserType userType;

    //Hago que la contraseña y el correo sea seguro y que no la envie al front
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonIgnore
    public String getEmail() {
        return email;
    }


}
