package com.gardengroup.agroplantationapp.entities;


import com.gardengroup.agroplantationapp.enumerations.AuthorizationType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode

public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50 , nullable = false)
    private String title;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    private Plantation plantation;
    @ManyToOne
    @JoinColumn(nullable = false)
    private User author;
    @Column(columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime publicationDate;
    @Column(columnDefinition = "BOOLEAN DEFAULT 0")
    private Boolean visibility;
    //private Image mainImage; TODO:
    //private List<Image> images;
    //private List<Comment> comments;
    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer score;
    @ManyToOne
    @JoinColumn(nullable = false)
    private StateRequest authorizationStatus;
}
