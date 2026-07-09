package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "activity_logs")
@Getter
@Setter
public class ActivityLog extends AbstractEntity {

    private UUID userId;

    @Column(nullable = false)
    private String action;

    private String entityType;
    private UUID entityId;

    /** JSON string: {"old_status":"open","new_status":"completed"} */
    @Column(columnDefinition = "text")
    private String details;

    private String ipAddress;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
