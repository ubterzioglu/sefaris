package site.sefaris.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.common.JsonUtil;
import site.sefaris.domain.Task;
import site.sefaris.domain.TaskComment;
import site.sefaris.domain.TaskFile;
import site.sefaris.domain.enums.TaskPriority;
import site.sefaris.domain.enums.TaskStatus;
import site.sefaris.dto.task.TaskDtos.*;
import site.sefaris.repository.TaskCommentRepository;
import site.sefaris.repository.TaskFileRepository;
import site.sefaris.repository.TaskRepository;
import site.sefaris.security.SecurityUtils;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/** Görev iş mantığı (rehber bölüm 4.2 + 15.1 durum geçişleri). */
@Service
public class TaskService {

    private final TaskRepository tasks;
    private final TaskCommentRepository comments;
    private final TaskFileRepository files;
    private final StorageService storage;
    private final ActivityLogService activity;

    public TaskService(TaskRepository tasks, TaskCommentRepository comments, TaskFileRepository files,
                       StorageService storage, ActivityLogService activity) {
        this.tasks = tasks;
        this.comments = comments;
        this.files = files;
        this.storage = storage;
        this.activity = activity;
    }

    public List<TaskResponse> list(String status, UUID assigneeId, UUID projectId, String priority) {
        return tasks.findAll().stream()
                .filter(t -> status == null || t.getStatus().name().equalsIgnoreCase(status))
                .filter(t -> assigneeId == null || assigneeId.equals(t.getAssigneeId()))
                .filter(t -> projectId == null || projectId.equals(t.getProjectId()))
                .filter(t -> priority == null || t.getPriority().name().equalsIgnoreCase(priority))
                .map(TaskResponse::from)
                .toList();
    }

    public TaskDetailResponse get(UUID id) {
        Task t = find(id);
        List<CommentResponse> cs = comments.findByTaskIdOrderByCreatedAtAsc(id)
                .stream().map(CommentResponse::from).toList();
        List<TaskFileResponse> fs = files.findByTaskId(id)
                .stream().map(TaskFileResponse::from).toList();
        return new TaskDetailResponse(TaskResponse.from(t), cs, fs);
    }

    @Transactional
    public TaskResponse create(CreateTaskRequest req) {
        if (req.dueDate() != null && req.dueDate().isBefore(LocalDate.now())) {
            throw new ApiException(ErrorCode.TASK_DUE_DATE_PAST, "dueDate");
        }
        Task t = new Task();
        t.setTitle(req.title());
        t.setDescription(req.description());
        t.setAssigneeId(req.assigneeId());
        t.setProjectId(req.projectId());
        t.setDueDate(req.dueDate());
        t.setPriority(parsePriority(req.priority(), TaskPriority.MEDIUM));
        t.setTags(JsonUtil.toJson(req.tags()));
        t.setEstimatedHours(req.estimatedHours());
        t.setCreatedBy(SecurityUtils.currentUserId());
        tasks.save(t);
        activity.log("task_created", "task", t.getId(), null);
        return TaskResponse.from(t);
    }

    @Transactional
    public TaskResponse update(UUID id, UpdateTaskRequest req) {
        Task t = find(id);
        if (req.title() != null) t.setTitle(req.title());
        if (req.description() != null) t.setDescription(req.description());
        if (req.assigneeId() != null) t.setAssigneeId(req.assigneeId());
        if (req.projectId() != null) t.setProjectId(req.projectId());
        if (req.dueDate() != null) t.setDueDate(req.dueDate());
        if (req.priority() != null) t.setPriority(parsePriority(req.priority(), t.getPriority()));
        if (req.status() != null) applyStatus(t, parseStatus(req.status()));
        if (req.tags() != null) t.setTags(JsonUtil.toJson(req.tags()));
        if (req.estimatedHours() != null) t.setEstimatedHours(req.estimatedHours());
        if (req.actualHours() != null) t.setActualHours(req.actualHours());
        t.setUpdatedAt(Instant.now());
        activity.log("task_updated", "task", t.getId(), null);
        return TaskResponse.from(t);
    }

    @Transactional
    public TaskResponse updateStatus(UUID id, String status) {
        Task t = find(id);
        applyStatus(t, parseStatus(status));
        t.setUpdatedAt(Instant.now());
        activity.log("task_status_changed", "task", t.getId(),
                "{\"new_status\":\"" + t.getStatus().name().toLowerCase() + "\"}");
        return TaskResponse.from(t);
    }

    @Transactional
    public void delete(UUID id) {
        tasks.delete(find(id));
        activity.log("task_deleted", "task", id, null);
    }

    @Transactional
    public CommentResponse addComment(UUID taskId, String content) {
        find(taskId);
        TaskComment c = new TaskComment();
        c.setTaskId(taskId);
        c.setUserId(SecurityUtils.currentUserId());
        c.setContent(content);
        comments.save(c);
        return CommentResponse.from(c);
    }

    @Transactional
    public void deleteComment(UUID commentId) {
        comments.deleteById(commentId);
    }

    @Transactional
    public TaskFileResponse addFile(UUID taskId, MultipartFile file) {
        find(taskId);
        var stored = storage.upload(file, "tasks/" + taskId);
        TaskFile f = new TaskFile();
        f.setTaskId(taskId);
        f.setFileName(stored.fileName());
        f.setFileUrl(stored.url());
        f.setFileSizeBytes(stored.sizeBytes());
        f.setUploadedBy(SecurityUtils.currentUserId());
        files.save(f);
        activity.log("file_uploaded", "task", taskId, null);
        return TaskFileResponse.from(f);
    }

    @Transactional
    public void deleteFile(UUID fileId) {
        files.deleteById(fileId);
    }

    // --- yardımcılar ---

    private Task find(UUID id) {
        return tasks.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
    }

    private void applyStatus(Task t, TaskStatus next) {
        t.setStatus(next);
        t.setCompletedAt(next == TaskStatus.COMPLETED ? Instant.now() : null);
    }

    private TaskStatus parseStatus(String s) {
        try {
            return TaskStatus.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.INVALID_STATUS_TRANSITION, "status");
        }
    }

    private TaskPriority parsePriority(String s, TaskPriority fallback) {
        if (s == null) return fallback;
        try {
            return TaskPriority.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            return fallback;
        }
    }
}
