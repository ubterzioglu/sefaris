package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.DocumentAccessLevel;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "documents")
@Getter
@Setter
public class Document extends AbstractEntity {

    @Column(nullable = false)
    private String folderPath;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileUrl;

    private Long fileSizeBytes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DocumentAccessLevel accessLevel = DocumentAccessLevel.TEAM;

    /** JSON array string: ["admin","super_admin"] */
    @Column(columnDefinition = "text")
    private String allowedRoles;

    private UUID uploadedBy;

    @Column(nullable = false)
    private Instant uploadedAt = Instant.now();
}
