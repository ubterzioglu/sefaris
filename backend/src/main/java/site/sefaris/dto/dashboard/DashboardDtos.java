package site.sefaris.dto.dashboard;

import site.sefaris.domain.ActivityLog;
import site.sefaris.domain.Announcement;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/** Dashboard modülü DTO'ları (rehber bölüm 4.10). */
public final class DashboardDtos {

    private DashboardDtos() {}

    public record DashboardStatsResponse(
            long totalTasks,
            long openTasks,
            long completedTasks,
            long delayedTasks,
            long totalProjects,
            long activeProjects,
            BigDecimal monthlyIncome,
            BigDecimal monthlyExpense
    ) {}

    public record ActivityLogResponse(
            UUID id, UUID userId, String action, String entityType, UUID entityId,
            String details, Instant createdAt
    ) {
        public static ActivityLogResponse from(ActivityLog a) {
            return new ActivityLogResponse(a.getId(), a.getUserId(), a.getAction(),
                    a.getEntityType(), a.getEntityId(), a.getDetails(), a.getCreatedAt());
        }
    }

    public record AnnouncementResponse(
            UUID id, String title, String content, String priority,
            LocalDate activeFrom, LocalDate activeUntil, Instant createdAt
    ) {
        public static AnnouncementResponse from(Announcement a) {
            return new AnnouncementResponse(a.getId(), a.getTitle(), a.getContent(),
                    a.getPriority() == null ? null : a.getPriority().name().toLowerCase(),
                    a.getActiveFrom(), a.getActiveUntil(), a.getCreatedAt());
        }
    }
}
