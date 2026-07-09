package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.sefaris.dto.task.TaskDtos.*;

import site.sefaris.service.TaskService;

import java.util.List;
import java.util.UUID;

/** /api/v1/tasks (rehber bölüm 4.2). RBAC: bölüm 5. */
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<TaskResponse> list(@RequestParam(required = false) String status,
                                   @RequestParam(required = false) UUID assignee_id,
                                   @RequestParam(required = false) UUID project_id,
                                   @RequestParam(required = false) String priority) {
        return taskService.list(status, assignee_id, project_id, priority);
    }

    @GetMapping("/{id}")
    public TaskDetailResponse get(@PathVariable UUID id) {
        return taskService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','DEVELOPER','DESIGNER','SEO_SPECIALIST')")
    public TaskResponse create(@Valid @RequestBody CreateTaskRequest req) {
        return taskService.create(req);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','DEVELOPER','DESIGNER','SEO_SPECIALIST')")
    public TaskResponse update(@PathVariable UUID id, @Valid @RequestBody UpdateTaskRequest req) {
        return taskService.update(id, req);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','DEVELOPER','DESIGNER','SEO_SPECIALIST')")
    public TaskResponse updateStatus(@PathVariable UUID id, @Valid @RequestBody UpdateStatusRequest req) {
        return taskService.updateStatus(id, req.status());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public void delete(@PathVariable UUID id) {
        taskService.delete(id);
    }

    @PostMapping("/{id}/comments")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentResponse addComment(@PathVariable UUID id, @Valid @RequestBody CommentRequest req) {
        return taskService.addComment(id, req.content());
    }

    @DeleteMapping("/{id}/comments/{commentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable UUID id, @PathVariable UUID commentId) {
        taskService.deleteComment(commentId);
    }

    @PostMapping("/{id}/files")
    @ResponseStatus(HttpStatus.CREATED)
    public TaskFileResponse addFile(@PathVariable UUID id, @RequestParam("file") MultipartFile file) {
        return taskService.addFile(id, file);
    }

    @DeleteMapping("/{id}/files/{fileId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFile(@PathVariable UUID id, @PathVariable UUID fileId) {
        taskService.deleteFile(fileId);
    }
}
