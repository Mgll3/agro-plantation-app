package com.garden_group.forum.infraestructure.repository.query.vote;

import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "votes")
@Getter
@Setter
@NoArgsConstructor
public class VoteMongo {
    @Id
    private String id;
    private String authorId;
    private String threadId;
    private Boolean isUpvote;
    private LocalDateTime createdAt;

    public void setId(UUID id) {
        this.id = id.toString();
    }

    public UUID getId() {
        return UUID.fromString(this.id);
    }

    public void setAuthorId(UUID authorId) {
        this.authorId = authorId.toString();
    }

    public UUID getAuthorId() {
        return UUID.fromString(this.authorId);
    }

    public void setThreadId(UUID threadId) {
        this.threadId = threadId.toString();
    }

    public UUID getThreadId() {
        return UUID.fromString(this.threadId);
    }

}
