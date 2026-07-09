package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.AnnouncementPriority;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "announcements")
@Getter
@Setter
public class Announcement extends AbstractEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AnnouncementPriority priority = AnnouncementPriority.NORMAL;

    private LocalDate activeFrom;
    private LocalDate activeUntil;

    private UUID createdBy;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
