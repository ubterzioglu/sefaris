package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "task_comments")
@Getter
@Setter
public class TaskComment extends AbstractEntity {

    @Column(nullable = false)
    private UUID taskId;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
