package com.gardengroup.agroplantationapp.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.model.entity.Vote;
import com.gardengroup.agroplantationapp.model.repository.VoteRepository;
import com.gardengroup.agroplantationapp.service.interfaces.IVoteService;

import jakarta.transaction.Transactional;
import lombok.Data;

@Service
public class VoteService implements IVoteService {

    @Autowired
    private VoteRepository voteRepository;

    public Boolean findByUserAndPublication(Long userId, Long publicationId) {

        return voteRepository.findByUserAndPublication(userId, publicationId).isPresent();

    }

    public Vote findByUserEmailAndPublicationId(String userEmail, Long publicationId) {

        return voteRepository.findByUserEmailAndPublicationId(userEmail, publicationId);

    }

    @Data
    public class VoteAndPublicationDTO {
        private Vote vote;
        private Publication publication;

        public VoteAndPublicationDTO(Vote vote, Publication publication) {
            this.vote = vote;
            this.publication = publication;
        }
    }

    @Transactional
    public VoteAndPublicationDTO votePublication(User user, Publication publication) {
        // Verificar si el usuario ya ha votado en esta publicación
        Vote existingVote = voteRepository.findByUserEmailAndPublicationId(user.getEmail(), publication.getId());

        if (existingVote != null) {
            // El usuario ya ha votado antes, eliminar voto
            voteRepository.delete(existingVote);

            // Actualizar el puntaje de la publicación en función del cambio de estado del
            // voto
            int newScore = publication.getScore() - 1; // Calcular el nuevo puntaje
            publication.setScore(newScore);

            return new VoteAndPublicationDTO(existingVote, publication);
        } 
        
        // El usuario no ha votado antes, se crea un nuevo voto
        Vote newVote = saveVote(user, publication);

        return new VoteAndPublicationDTO(newVote, publication);
    }

    public Vote saveVote(User user, Publication publication) {
        Vote newVote = new Vote();
        newVote.setUser(user);
        newVote.setPublication(publication);
        newVote.setState(true); // Indica que el usuario votó positivamente

        // Actualizar el puntaje de la publicación sumando 1 al puntaje actual
        int newScore = publication.getScore() + 1; // Sumar 1 al puntaje
        publication.setScore(newScore);

        // Guardar el nuevo voto en la base de datos
        return voteRepository.save(newVote);
    }

}
