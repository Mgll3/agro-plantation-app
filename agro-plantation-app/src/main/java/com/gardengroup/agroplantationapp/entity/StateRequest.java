package com.gardengroup.agroplantationapp.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "state_request")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class StateRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String state;

    public StateRequest() {
    }

    public StateRequest(Long id) {
        this.id = id;
    }

// ('PENDING'), ('ACCEPTED'), ('DECLINED')
}
