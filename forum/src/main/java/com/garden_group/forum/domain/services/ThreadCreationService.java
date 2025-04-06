package com.garden_group.forum.domain.services;

import java.util.Arrays;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.garden_group.forum.domain.entity.Thread;
import com.garden_group.forum.domain.repository.user.UserCommandRepository;
import com.garden_group.forum.shared.utils.Constants;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ThreadCreationService {

    @Autowired
    private final UserCommandRepository userRepository;

    private static final String[] BAD_WORDS = {
            "fuck", "shit", "bitch", "asshole", "bastard", "damn", "crap",
            "dick", "pussy", "cunt", "motherfucker", "nigger", "slut", "whore",
            "faggot", "cock", "tit", "twat", "bollocks", "prick", "arse", "wanker"
    };

    public Mono<Thread> validateThreadCreation(Mono<Thread> threadMono) {
        return threadMono.flatMap(thread -> {
            validateWords(thread.getContent());

            return userRepository.existsById(thread.getAuthorId())
                    .flatMap(userExists -> {
                        if (!userExists) {
                            return Mono.error(new IllegalArgumentException(Constants.U_NOT_FOUND));
                        }

                        // Convert in Uppercase only the first letter of each word in the title
                        thread.updateTitle(
                                Arrays.stream(thread.getTitle().split(" "))
                                        .map(word -> word.substring(0, 1).toUpperCase()
                                                + word.substring(1).toLowerCase())
                                        .collect(Collectors.joining(" ")));

                        return Mono.just(thread);
                    });
        });
    }

    // Check words with maximum length 20 characters and filter bad words
    public void validateWords(String content) {

        Arrays.stream(content.split(" "))
                .forEach(word -> {
                    if (word.length() > 20) {
                        throw new IllegalArgumentException("Content contains a word that is too long: " + word);
                    }
                    if (Arrays.stream(BAD_WORDS).anyMatch(word::equalsIgnoreCase)) {
                        throw new IllegalArgumentException("Content contains a bad word: " + word);
                    }
                });
    }

}
