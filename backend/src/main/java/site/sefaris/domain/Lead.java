package site.sefaris.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import site.sefaris.domain.enums.Currency;
import site.sefaris.domain.enums.LeadSource;
import site.sefaris.domain.enums.LeadStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "leads")
@Getter
@Setter
public class Lead extends AbstractEntity {

    private UUID customerId;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private LeadSource source;

    private String sourceDetail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private LeadStatus status = LeadStatus.NEW;

    private BigDecimal expectedValue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 5)
    private Currency currency = Currency.EUR;

    private UUID assignedTo;

    @Column(columnDefinition = "text")
    private String notes;

    private String contactName;
    private String contactEmail;
    private String contactPhone;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    @Column(nullable = false)
    private Instant updatedAt = Instant.now();
}
