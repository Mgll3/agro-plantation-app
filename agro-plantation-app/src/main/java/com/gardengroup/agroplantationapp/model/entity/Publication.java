package com.gardengroup.agroplantationapp.model.entity;

import com.gardengroup.agroplantationapp.model.dto.publication.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationUpdDTO;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50, nullable = false)
    private String title;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
    private Plantation plantation;
    @ManyToOne()
    @JoinColumn(nullable = false)
    private User author;
    @Column(columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime publicationDate;
    @Column(columnDefinition = "BOOLEAN DEFAULT 0")
    private Boolean visibility;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Image mainImage;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Image> images;
    // private List<Comment> comments; proximamente
    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer score;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private StateRequest authorizationStatus;

    // Actualizar unicamenete la información que no esta ya guardada en la
    // publicación
    public void updateInfo(Publication publication) {

        if (!this.title.equals(publication.title) && (publication.title != null)) {
            this.setTitle(publication.title);
        }
        if (!this.plantation.equals(publication.plantation) && (publication.plantation != null)) {
            this.setPlantation(publication.plantation);
        }
        if (!this.visibility.equals(publication.visibility) && (publication.visibility != null)) {
            this.setVisibility(publication.visibility);
        }

    }

    public Publication(PublicationSaveDTO publicationDTO) {
        this.title = publicationDTO.getTitle();
        this.plantation = publicationDTO.getPlantation();
    }

    public Publication(PublicationUpdDTO publicationDTO) {
        this.id = publicationDTO.getId();
        this.title = publicationDTO.getTitle();
        this.plantation = publicationDTO.getPlantation();
        this.visibility = publicationDTO.getVisibility();
    }

}
