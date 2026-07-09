package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.Role;
import site.sefaris.domain.enums.UserStatus;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User extends AbstractEntity {

    @Column(nullable = false, unique = true)
    private String email;

    private String passwordHash;

    @Column(nullable = false)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserStatus status = UserStatus.ACTIVE;

    private String avatarUrl;

    private BigDecimal hourlyRate;

    /** JSON array string: ["Spring Boot","Next.js"] */
    @Column(columnDefinition = "text")
    private String expertiseTags;

    @Column(unique = true)
    private String googleId;

    @Column(nullable = false, length = 5)
    private String preferredLanguage = "tr";

    @Column(nullable = false, length = 50)
    private String timezone = "Europe/Istanbul";

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    private Instant lastLoginAt;
}
