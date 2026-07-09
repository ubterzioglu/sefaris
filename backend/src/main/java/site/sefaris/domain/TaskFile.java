package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "task_files")
@Getter
@Setter
public class TaskFile extends AbstractEntity {

    @Column(nullable = false)
    private UUID taskId;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileUrl;

    private Long fileSizeBytes;

    private UUID uploadedBy;

    @Column(nullable = false)
    private Instant uploadedAt = Instant.now();
}
