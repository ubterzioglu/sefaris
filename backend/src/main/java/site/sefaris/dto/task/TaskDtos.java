package site.sefaris.dto.task;

import jakarta.validation.constraints.*;
import site.sefaris.common.JsonUtil;
import site.sefaris.domain.Task;
import site.sefaris.domain.TaskComment;
import site.sefaris.domain.TaskFile;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/** Görev modülü DTO'ları (rehber bölüm 4.2 + 11.1). */
public final class TaskDtos {

    private TaskDtos() {}

    public record CreateTaskRequest(
            @NotBlank @Size(min = 2, max = 300, message = "En az 2, en fazla 300 karakter") String title,
            @Size(max = 5000) String description,
            UUID assigneeId,
            UUID projectId,
            LocalDate dueDate,
            String priority,
            List<@Size(max = 50) String> tags,
            @DecimalMin("0") @DecimalMax("1000") BigDecimal estimatedHours
    ) {}

    public record UpdateTaskRequest(
            @Size(min = 2, max = 300) String title,
            @Size(max = 5000) String description,
            UUID assigneeId,
            UUID projectId,
            LocalDate dueDate,
            String priority,
            String status,
            List<String> tags,
            BigDecimal estimatedHours,
            BigDecimal actualHours
    ) {}

    public record UpdateStatusRequest(
            @NotBlank String status
    ) {}

    public record CommentRequest(
            @NotBlank @Size(max = 5000) String content
    ) {}

    public record CommentResponse(UUID id, UUID taskId, UUID userId, String content, Instant createdAt) {
        public static CommentResponse from(TaskComment c) {
            return new CommentResponse(c.getId(), c.getTaskId(), c.getUserId(), c.getContent(), c.getCreatedAt());
        }
    }

    public record TaskFileResponse(UUID id, UUID taskId, String fileName, String fileUrl,
                                   Long fileSizeBytes, Instant uploadedAt) {
        public static TaskFileResponse from(TaskFile f) {
            return new TaskFileResponse(f.getId(), f.getTaskId(), f.getFileName(), f.getFileUrl(),
                    f.getFileSizeBytes(), f.getUploadedAt());
        }
    }

    public record TaskResponse(
            UUID id, String title, String description, String status, String priority,
            UUID assigneeId, UUID projectId, LocalDate dueDate, Instant completedAt,
            UUID createdBy, List<String> tags, BigDecimal estimatedHours, BigDecimal actualHours,
            Instant createdAt, Instant updatedAt
    ) {
        public static TaskResponse from(Task t) {
            return new TaskResponse(t.getId(), t.getTitle(), t.getDescription(),
                    t.getStatus().name().toLowerCase(), t.getPriority().name().toLowerCase(),
                    t.getAssigneeId(), t.getProjectId(), t.getDueDate(), t.getCompletedAt(),
                    t.getCreatedBy(), JsonUtil.toList(t.getTags()), t.getEstimatedHours(),
                    t.getActualHours(), t.getCreatedAt(), t.getUpdatedAt());
        }
    }

    public record TaskDetailResponse(
            TaskResponse task,
            List<CommentResponse> comments,
            List<TaskFileResponse> files
    ) {}
}
