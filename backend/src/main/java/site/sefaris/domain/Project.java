package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.Currency;
import site.sefaris.domain.enums.ProjectStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "projects")
@Getter
@Setter
public class Project extends AbstractEntity {

    @Column(nullable = false)
    private String name;

    private UUID customerId;

    @Column(columnDefinition = "text")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ProjectStatus status = ProjectStatus.PROPOSAL;

    private BigDecimal budgetAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 5)
    private Currency budgetCurrency = Currency.EUR;

    private LocalDate startDate;
    private LocalDate endDate;

    @Column(nullable = false)
    private BigDecimal profitShareDev = BigDecimal.valueOf(40);
    @Column(nullable = false)
    private BigDecimal profitShareDesign = BigDecimal.valueOf(20);
    @Column(nullable = false)
    private BigDecimal profitSharePm = BigDecimal.valueOf(20);
    @Column(nullable = false)
    private BigDecimal profitShareCompany = BigDecimal.valueOf(20);

    private UUID createdBy;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
