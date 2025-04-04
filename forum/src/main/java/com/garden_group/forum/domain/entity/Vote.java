package com.garden_group.forum.domain.entity;

import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Table("vote")
@NoArgsConstructor
@Data
public class Vote {

    @Id
    private UUID id;
    private UUID userId;
    private UUID threadId;
}
