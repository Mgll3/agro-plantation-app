package com.gardengroup.agroplantationapp.entity;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Table(name ="producer_request")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class ProducerRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;
    @Column(columnDefinition = "DATETIME")
    private Date date;

    @ManyToOne
    @JoinColumn(nullable = false)
    private StateRequest staterequest;
    //crea usuarios que queiren ser productores en estado pendiente
}
