package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "project_members")
@Getter
@Setter
public class ProjectMember extends AbstractEntity {

    @Column(nullable = false)
    private UUID projectId;

    @Column(nullable = false)
    private UUID userId;

    private String roleInProject;

    @Column(nullable = false)
    private Instant joinedAt = Instant.now();
}
