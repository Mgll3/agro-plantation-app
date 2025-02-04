package com.gardengroup.agroplantationapp.model.dto.publication;

import com.gardengroup.agroplantationapp.model.entity.Image;
import com.gardengroup.agroplantationapp.model.entity.Plantation;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.StateRequest;
import com.gardengroup.agroplantationapp.model.entity.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class PublicationDTO {

    @NotNull(message = "El ID no puede ser nulo.")
    private Long id;
    @NotNull(message = "El título es obligatorio.")
    @Size(max = 50, message = "El título no puede superar los 50 caracteres.")
    private String title;
    @NotNull(message = "La plantación es obligatoria.")
    private Plantation plantation;

    @NotNull(message = "El autor es obligatorio.")
    private User author;
    @NotNull(message = "La fecha de publicación es obligatoria.")
    private LocalDateTime publicationDate;
    @NotNull(message = "La visibilidad no puede ser nula.")
    private Boolean visibility;

    private Image mainImage;

    private List<Image> images;
    // private List<Comment> comments; proximamente
    //aca van validaciones ?
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
