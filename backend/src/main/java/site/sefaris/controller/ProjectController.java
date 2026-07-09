package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sefaris.common.PageResponse;
import site.sefaris.dto.project.ProjectDtos.*;
import site.sefaris.dto.task.TaskDtos.TaskResponse;
import site.sefaris.service.ProjectService;

import java.util.List;
import java.util.UUID;

/** /api/v1/projects (rehber bölüm 4.4). RBAC: bölüm 5. */
@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public PageResponse<ProjectResponse> list(@RequestParam(required = false) String status,
                                              @RequestParam(name = "customer_id", required = false) UUID customerId,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "20") int limit) {
        return projectService.list(status, customerId, page, limit);
    }

    @GetMapping("/{id}")
    public ProjectDetailResponse get(@PathVariable UUID id) {
        return projectService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ProjectResponse create(@Valid @RequestBody CreateProjectRequest req) {
        return projectService.create(req);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ProjectResponse update(@PathVariable UUID id, @Valid @RequestBody UpdateProjectRequest req) {
        return projectService.update(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public void delete(@PathVariable UUID id) {
        projectService.delete(id);
    }

    @PostMapping("/{id}/members")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public ProjectMemberResponse addMember(@PathVariable UUID id, @Valid @RequestBody AddMemberRequest req) {
        return projectService.addMember(id, req);
    }

    @DeleteMapping("/{id}/members/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public void removeMember(@PathVariable UUID id, @PathVariable UUID userId) {
        projectService.removeMember(id, userId);
    }

    @GetMapping("/{id}/tasks")
    public List<TaskResponse> tasks(@PathVariable UUID id) {
        return projectService.tasks(id);
    }

    @GetMapping("/{id}/finances")
    public FinanceSummaryOfProject finances(@PathVariable UUID id) {
        return projectService.finances(id);
    }
}
