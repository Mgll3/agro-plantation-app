package com.garden_group.forum.domain.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.*;

@Table("thread")
@Getter
@NoArgsConstructor
public class Thread {

    @Id
    private UUID id;
    private String title;
    private String content;
    private UUID authorId;
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

    public void setAuthorId(UUID authorId) {
        this.authorId = authorId;
    }
}
