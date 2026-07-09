package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.TaskPriority;
import site.sefaris.domain.enums.TaskStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tasks")
@Getter
@Setter
public class Task extends AbstractEntity {

    @Column(nullable = false, length = 300)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TaskStatus status = TaskStatus.OPEN;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TaskPriority priority = TaskPriority.MEDIUM;

    /** NULL = "Ortak Havuz" */
    private UUID assigneeId;

    private UUID projectId;

    private LocalDate dueDate;

    private Instant completedAt;

    @Column(nullable = false)
    private UUID createdBy;

    /** JSON array string: ["frontend","bug"] */
    @Column(columnDefinition = "text")
    private String tags;

    private BigDecimal estimatedHours;
    private BigDecimal actualHours;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    @Column(nullable = false)
    private Instant updatedAt = Instant.now();
}
