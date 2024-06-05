package com.gardengroup.agroplantationapp.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.gardengroup.agroplantationapp.model.dto.publication.PublicationFilterDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationSaveDTO;
import com.gardengroup.agroplantationapp.model.dto.publication.PublicationUpdDTO;
import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.Vote;

public interface IPublicationService {
    
    public Publication savePublication(PublicationSaveDTO publicationDTO, String email);
    public void saveImages(MultipartFile mainFile, List<MultipartFile> files, Long publicationId);
    public Publication updateVisibility(Long publicationId, String email);
    public List<Publication> getTopPublications();
    public Publication getPublication(Long id);
    public List<Publication> publicationsByEmail(String email);
    public void updatePublication(PublicationUpdDTO publicationUpdDTO);
    public void deletePublication(Long id);
    public List<Publication> pendingPublications();
    public void approvePublication(Long publicationId);
    public void rejectPublication(Long publicationId);
    public Vote toggleVote(Long publicationId, String userEmail);
    public PublicationFilterDTO getPublicationsByLike(int pag);
    public PublicationFilterDTO getPublicationsByUser(int pag);
    public PublicationFilterDTO getPublicationsByDate(int pag);
    public PublicationFilterDTO getPublicationsByAleatory(int pag);
    public PublicationFilterDTO getPublicationsByPending(int pag);
    public PublicationFilterDTO getPublicationsByQuantity(int pag);
    public void changeToPending(Long publicationId);
}
