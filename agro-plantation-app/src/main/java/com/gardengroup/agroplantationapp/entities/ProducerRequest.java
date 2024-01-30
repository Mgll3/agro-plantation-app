package com.gardengroup.agroplantationapp.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name ="producer-request")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class ProducerRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private Date date;

    @ManyToOne
    private StateRequest staterequest;
}
