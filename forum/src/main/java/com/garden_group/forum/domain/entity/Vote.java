package com.garden_group.forum.domain.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table("vote")
@NoArgsConstructor
@Data
public class Vote {
    @Id
    private UUID id;
    private UUID authorId;
    private UUID threadId;
    @Column("is_upvote")
    private Boolean isUpvote;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Vote(UUID threadId, UUID authorId, Boolean isUpvote) {
        this.threadId = threadId;
        this.authorId = authorId;
        this.isUpvote = isUpvote;
    }
}
