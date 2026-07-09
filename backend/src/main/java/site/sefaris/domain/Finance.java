package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.Currency;
import site.sefaris.domain.enums.FinanceCategory;
import site.sefaris.domain.enums.FinanceType;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "finances")
@Getter
@Setter
public class Finance extends AbstractEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private FinanceType type;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private FinanceCategory category;

    private UUID projectId;

    @Column(nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 5)
    private Currency currency;

    @Column(nullable = false)
    private BigDecimal exchangeRate = BigDecimal.ONE;

    private BigDecimal amountEur;

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private LocalDate date;

    private UUID createdBy;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
