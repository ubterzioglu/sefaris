package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "lead_history")
@Getter
@Setter
public class LeadHistory extends AbstractEntity {

    @Column(nullable = false)
    private UUID leadId;

    private String oldStatus;
    private String newStatus;

    @Column(columnDefinition = "text")
    private String note;

    private UUID changedBy;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
