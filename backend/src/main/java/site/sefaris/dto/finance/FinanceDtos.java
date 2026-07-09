package site.sefaris.dto.finance;

import jakarta.validation.constraints.*;
import site.sefaris.domain.Finance;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/** Finans modülü DTO'ları (rehber bölüm 4.6). */
public final class FinanceDtos {

    private FinanceDtos() {}

    public record CreateFinanceRequest(
            @NotBlank String type,
            String category,
            UUID projectId,
            @NotNull @DecimalMin("0") BigDecimal amount,
            @NotBlank String currency,
            BigDecimal exchangeRate,
            @Size(max = 5000) String description,
            @NotNull LocalDate date
    ) {}

    public record UpdateFinanceRequest(
            String type,
            String category,
            UUID projectId,
            @DecimalMin("0") BigDecimal amount,
            String currency,
            BigDecimal exchangeRate,
            @Size(max = 5000) String description,
            LocalDate date
    ) {}

    public record FinanceResponse(
            UUID id, String type, String category, UUID projectId, BigDecimal amount,
            String currency, BigDecimal exchangeRate, BigDecimal amountEur, String description,
            LocalDate date, UUID createdBy, Instant createdAt
    ) {
        public static FinanceResponse from(Finance f) {
            return new FinanceResponse(
                    f.getId(),
                    f.getType() == null ? null : f.getType().name().toLowerCase(),
                    f.getCategory() == null ? null : f.getCategory().name().toLowerCase(),
                    f.getProjectId(), f.getAmount(),
                    f.getCurrency() == null ? null : f.getCurrency().name().toLowerCase(),
                    f.getExchangeRate(), f.getAmountEur(), f.getDescription(),
                    f.getDate(), f.getCreatedBy(), f.getCreatedAt());
        }
    }

    public record FinanceSummaryResponse(
            BigDecimal totalIncome,
            BigDecimal totalExpense,
            BigDecimal netProfit
    ) {}

    public record ShareLine(
            String role,
            BigDecimal percentage,
            BigDecimal amount
    ) {}

    public record ProfitShareResponse(
            BigDecimal totalProfit,
            List<ShareLine> shares
    ) {}
}
