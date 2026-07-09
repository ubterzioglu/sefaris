package site.sefaris.dto.lead;

import jakarta.validation.constraints.*;
import site.sefaris.domain.Lead;
import site.sefaris.domain.LeadHistory;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

/** Lead modülü DTO'ları (rehber bölüm 4.5). */
public final class LeadDtos {

    private LeadDtos() {}

    public record CreateLeadRequest(
            String source,
            @Size(max = 500) String sourceDetail,
            @Size(max = 200) String contactName,
            @Email String contactEmail,
            @Size(max = 50) String contactPhone,
            BigDecimal expectedValue,
            String currency,
            UUID assignedTo,
            @Size(max = 5000) String notes
    ) {}

    public record UpdateLeadRequest(
            String source,
            @Size(max = 500) String sourceDetail,
            @Size(max = 200) String contactName,
            @Email String contactEmail,
            @Size(max = 50) String contactPhone,
            BigDecimal expectedValue,
            String currency,
            UUID assignedTo,
            @Size(max = 5000) String notes
    ) {}

    public record UpdateLeadStatusRequest(
            @NotBlank String status,
            @Size(max = 5000) String notes
    ) {}

    public record LeadResponse(
            UUID id, UUID customerId, String source, String sourceDetail, String status,
            BigDecimal expectedValue, String currency, UUID assignedTo, String notes,
            String contactName, String contactEmail, String contactPhone,
            Instant createdAt, Instant updatedAt
    ) {
        public static LeadResponse from(Lead l) {
            return new LeadResponse(
                    l.getId(), l.getCustomerId(),
                    l.getSource() == null ? null : l.getSource().name().toLowerCase(),
                    l.getSourceDetail(),
                    l.getStatus() == null ? null : l.getStatus().name().toLowerCase(),
                    l.getExpectedValue(),
                    l.getCurrency() == null ? null : l.getCurrency().name().toLowerCase(),
                    l.getAssignedTo(), l.getNotes(),
                    l.getContactName(), l.getContactEmail(), l.getContactPhone(),
                    l.getCreatedAt(), l.getUpdatedAt());
        }
    }

    public record LeadHistoryResponse(
            UUID id, UUID leadId, String oldStatus, String newStatus, String note,
            UUID changedBy, Instant createdAt
    ) {
        public static LeadHistoryResponse from(LeadHistory h) {
            return new LeadHistoryResponse(h.getId(), h.getLeadId(), h.getOldStatus(),
                    h.getNewStatus(), h.getNote(), h.getChangedBy(), h.getCreatedAt());
        }
    }

    public record LeadDetailResponse(
            LeadResponse lead,
            List<LeadHistoryResponse> history
    ) {}
}
