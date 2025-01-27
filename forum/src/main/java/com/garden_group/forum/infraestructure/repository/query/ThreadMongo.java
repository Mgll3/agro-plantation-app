package com.garden_group.forum.infraestructure.repository.query;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.garden_group.forum.domain.entity.ForumUser;

@Document(collection = "threads")
@Getter
@Setter
@NoArgsConstructor
public class ThreadMongo {
    @Id
    private String id; // MongoDB utiliza típicamente String o ObjectId para IDs
    private String title;
    private String content;
    private String author;
    private Boolean isVisible;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
