package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.SeoStatus;
import site.sefaris.domain.enums.SeoTargetCountry;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "seo_campaigns")
@Getter
@Setter
public class SeoCampaign extends AbstractEntity {

    @Column(nullable = false)
    private String name;

    private UUID customerId;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private SeoTargetCountry targetCountry;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SeoStatus status = SeoStatus.ACTIVE;

    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal monthlyBudget;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
