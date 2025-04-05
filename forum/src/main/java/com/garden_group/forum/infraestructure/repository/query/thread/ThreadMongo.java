package com.garden_group.forum.infraestructure.repository.query.thread;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "threads")
@Data
@NoArgsConstructor
public class ThreadMongo {
    @Id
    private String id;
    private String title;
    private String content;
    private String authorId;
    private Boolean isVisible;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

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
}
