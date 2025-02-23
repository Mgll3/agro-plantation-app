package com.gardengroup.agroplantationapp.service.interfaces;

import com.gardengroup.agroplantationapp.model.entity.Publication;
import com.gardengroup.agroplantationapp.model.entity.User;
import com.gardengroup.agroplantationapp.model.entity.Vote;
import com.gardengroup.agroplantationapp.service.implementation.VoteService.VoteAndPublicationDTO;

public interface IVoteService {

    public Boolean findByUserAndPublication(Long userId, Long publicationId);

    public VoteAndPublicationDTO votePublication(User user, Publication publication);

    public Vote saveVote(User user, Publication publication);

    public Vote findByUserEmailAndPublicationId(String userEmail, Long publicationId);
}
