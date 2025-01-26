package com.garden_group.forum.domain.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
public class Thread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private String authorId;
    private Boolean isVisible;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;

    public void setVisibility(Boolean isVisible) {
        this.isVisible = isVisible;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateContent(String newContent) {
        this.content = newContent;
        this.updatedAt = LocalDateTime.now();
    }

    public void updateTitle(String newTitle) {
        this.title = newTitle;
        this.updatedAt = LocalDateTime.now();
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }
}
