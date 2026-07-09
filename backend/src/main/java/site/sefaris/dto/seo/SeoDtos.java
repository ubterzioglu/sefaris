package site.sefaris.dto.seo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import site.sefaris.domain.SeoCampaign;
import site.sefaris.domain.SeoKeyword;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/** SEO modülü DTO'ları (rehber bölüm 4.8). */
public final class SeoDtos {

    private SeoDtos() {}

    public record CreateCampaignRequest(
            @NotBlank String name,
            UUID customerId,
            String targetCountry,
            BigDecimal monthlyBudget
    ) {}

    public record CreateKeywordRequest(
            @NotNull UUID campaignId,
            @NotBlank String keyword,
            String targetUrl
    ) {}

    public record UpdateRankRequest(
            Integer currentRank,
            Integer searchVolume
    ) {}

    public record SeoCampaignResponse(
            UUID id,
            String name,
            UUID customerId,
            String targetCountry,
            String status,
            LocalDate startDate,
            LocalDate endDate,
            BigDecimal monthlyBudget,
            Instant createdAt
    ) {
        public static SeoCampaignResponse from(SeoCampaign c) {
            return new SeoCampaignResponse(
                    c.getId(), c.getName(), c.getCustomerId(),
                    c.getTargetCountry() == null ? null : c.getTargetCountry().name().toLowerCase(),
                    c.getStatus() == null ? null : c.getStatus().name().toLowerCase(),
                    c.getStartDate(), c.getEndDate(), c.getMonthlyBudget(), c.getCreatedAt());
        }
    }

    public record SeoKeywordResponse(
            UUID id,
            UUID campaignId,
            String keyword,
            String targetUrl,
            Integer currentRank,
            Integer previousRank,
            Integer searchVolume,
            LocalDate lastChecked
    ) {
        public static SeoKeywordResponse from(SeoKeyword k) {
            return new SeoKeywordResponse(
                    k.getId(), k.getCampaignId(), k.getKeyword(), k.getTargetUrl(),
                    k.getCurrentRank(), k.getPreviousRank(), k.getSearchVolume(), k.getLastChecked());
        }
    }

    public record SeoCampaignDetailResponse(
            SeoCampaignResponse campaign,
            List<SeoKeywordResponse> keywords
    ) {}
}
