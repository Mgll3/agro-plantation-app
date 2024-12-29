package com.garden_group.forum.infraestructure.repository.command;

import com.garden_group.forum.domain.entity.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadCommandJpaRepository extends JpaRepository<Thread, Long> {

}
