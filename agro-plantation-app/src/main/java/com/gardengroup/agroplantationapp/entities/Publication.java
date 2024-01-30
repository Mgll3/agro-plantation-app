package com.gardengroup.agroplantationapp.entities;


import com.gardengroup.agroplantationapp.enumerations.AuthorizationType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @OneToOne
    private Plantation plantation;
    @ManyToOne
    private User author;
    private Date publicationDate;
    private Boolean visibility;
    //private Image mainImage; TODO: 
    //private List<Image> images;
    //private List<Comment> comments;
    private Integer score;
    @Enumerated(EnumType.STRING)
    private AuthorizationType authorizationStatus;
}
