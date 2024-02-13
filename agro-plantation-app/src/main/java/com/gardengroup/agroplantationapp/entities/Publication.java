package com.gardengroup.agroplantationapp.entities;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //Hacer que el titulo tenga un tamaño de varchar(50) en base de datos:
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
    //private List<Comment> comments;
    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer score;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private StateRequest authorizationStatus;

    //Actualizar unicamenete la información que no esta ya guardada en la publicación
    public void updateInfo(Publication publication){

        if(this.title != publication.title && publication.title != null){
            this.setTitle(publication.title);
        }
        if(!this.plantation.equals(publication.plantation) && publication.plantation != null){
            this.setPlantation(publication.plantation);
        }
        if(this.visibility != publication.visibility && publication.visibility != null){
            this.setVisibility(publication.visibility);
        }
        
    }
}
