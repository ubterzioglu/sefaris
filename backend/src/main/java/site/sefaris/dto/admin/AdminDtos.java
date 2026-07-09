package site.sefaris.dto.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import site.sefaris.domain.ActivityLog;
import site.sefaris.domain.Announcement;
import site.sefaris.domain.EmailTemplate;
import site.sefaris.domain.SystemSetting;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

/** Admin modülü DTO'ları (rehber bölüm 4.9). */
public final class AdminDtos {

    private AdminDtos() {}

    public record CreateUserRequest(
            @Email @NotBlank String email,
            @NotBlank String fullName,
            @NotBlank String role,
            @Size(min = 8) String password,
            BigDecimal hourlyRate
    ) {}

    public record UpdateRoleRequest(
            @NotBlank String role
    ) {}

    public record UpdateSettingRequest(
            @NotBlank String settingKey,
            String settingValue
    ) {}

    public record UpdateEmailTemplateRequest(
            String subject,
            String bodyHtml,
            String bodyText,
            Boolean isActive
    ) {}

    public record CreateAnnouncementRequest(
            @NotBlank String title,
            @NotBlank String content,
            String priority
    ) {}

    public record ActivityLogResponse(
            UUID id,
            UUID userId,
            String action,
            String entityType,
            UUID entityId,
            String details,
            Instant createdAt
    ) {
        public static ActivityLogResponse from(ActivityLog a) {
            return new ActivityLogResponse(
                    a.getId(), a.getUserId(), a.getAction(), a.getEntityType(),
                    a.getEntityId(), a.getDetails(), a.getCreatedAt());
        }
    }

    public record SystemSettingResponse(
            UUID id,
            String settingKey,
            String settingValue,
            String settingType,
            String description
    ) {
        public static SystemSettingResponse from(SystemSetting s) {
            return new SystemSettingResponse(
                    s.getId(), s.getSettingKey(), s.getSettingValue(),
                    s.getSettingType() == null ? null : s.getSettingType().name().toLowerCase(),
                    s.getDescription());
        }
    }

    public record EmailTemplateResponse(
            UUID id,
            String name,
            String subject,
            String bodyHtml,
            String bodyText,
            String variables,
            String language,
            boolean isActive
    ) {
        public static EmailTemplateResponse from(EmailTemplate t) {
            return new EmailTemplateResponse(
                    t.getId(), t.getName(), t.getSubject(), t.getBodyHtml(), t.getBodyText(),
                    t.getVariables(), t.getLanguage(), t.isActive());
        }
    }

    public record AnnouncementResponse(
            UUID id,
            String title,
            String content,
            String priority,
            LocalDate activeFrom,
            LocalDate activeUntil,
            UUID createdBy,
            Instant createdAt
    ) {
        public static AnnouncementResponse from(Announcement a) {
            return new AnnouncementResponse(
                    a.getId(), a.getTitle(), a.getContent(),
                    a.getPriority() == null ? null : a.getPriority().name().toLowerCase(),
                    a.getActiveFrom(), a.getActiveUntil(), a.getCreatedBy(), a.getCreatedAt());
        }
    }
}
