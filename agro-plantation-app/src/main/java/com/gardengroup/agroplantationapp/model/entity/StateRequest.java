package com.gardengroup.agroplantationapp.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import lombok.NoArgsConstructor;

import lombok.ToString;

@Entity
@Table(name = "state_request")
@Data
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class StateRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String state;

    public StateRequest(Long id) {
        this.id = id;
    }

// ('PENDING'), ('ACCEPTED'), ('DECLINED')
}
