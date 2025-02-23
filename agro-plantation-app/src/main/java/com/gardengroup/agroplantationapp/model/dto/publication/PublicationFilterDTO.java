package com.gardengroup.agroplantationapp.model.dto.publication;

import java.util.List;
import com.gardengroup.agroplantationapp.model.entity.Publication;

import lombok.Data;

@Data
public class PublicationFilterDTO {
    private List<Publication> publications;
    private int pagination;

    public PublicationFilterDTO(List<Publication> publications, int plantation) {
        this.publications = publications;
        this.pagination = plantation;
    }
}
