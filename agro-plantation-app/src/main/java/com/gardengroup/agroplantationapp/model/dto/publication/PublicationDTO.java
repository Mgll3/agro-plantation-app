package com.gardengroup.agroplantationapp.model.dto.publication;

import com.gardengroup.agroplantationapp.model.entity.Image;
import com.gardengroup.agroplantationapp.model.entity.Plantation;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;
import com.gardengroup.agroplantationapp.model.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class PublicationDTO {

    private Long id;

    private String title;

    private Plantation plantation;

    private User author;

    private LocalDateTime publicationDate;

    private Boolean visibility;

    private Image mainImage;

    private List<Image> images;
    // private List<Comment> comments; proximamente

    private Integer score;

    private StateRequest authorizationStatus;

    private Boolean userVote;

    public PublicationDTO(Publication publication) {
        this.id = publication.getId();
        this.title = publication.getTitle();
        this.plantation = publication.getPlantation();
        this.author = publication.getAuthor();
        this.publicationDate = publication.getPublicationDate();
        this.visibility = publication.getVisibility();
        this.mainImage = publication.getMainImage();
        this.images = publication.getImages();
        this.score = publication.getScore();
        this.authorizationStatus = publication.getAuthorizationStatus();
    }

}
