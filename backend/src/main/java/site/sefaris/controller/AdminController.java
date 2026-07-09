package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sefaris.dto.UserResponse;
import site.sefaris.dto.admin.AdminDtos.*;
import site.sefaris.service.AdminService;

import java.util.List;
import java.util.UUID;

/** /api/v1/admin (rehber bölüm 4.9). */
@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // --- users ---

    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public List<UserResponse> listUsers() {
        return adminService.listUsers();
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public UserResponse createUser(@Valid @RequestBody CreateUserRequest req) {
        return adminService.createUser(req);
    }

    @PutMapping("/users/{id}/role")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public UserResponse updateRole(@PathVariable UUID id, @Valid @RequestBody UpdateRoleRequest req) {
        return adminService.updateRole(id, req);
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public void deleteUser(@PathVariable UUID id) {
        adminService.deleteUser(id);
    }

    // --- activity logs ---

    @GetMapping("/activity-logs")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public List<ActivityLogResponse> listActivityLogs(@RequestParam(required = false) UUID user_id) {
        return adminService.listActivityLogs(user_id);
    }

    // --- settings ---

    @GetMapping("/settings")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public List<SystemSettingResponse> listSettings() {
        return adminService.listSettings();
    }

    @PutMapping("/settings")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public SystemSettingResponse upsertSetting(@Valid @RequestBody UpdateSettingRequest req) {
        return adminService.upsertSetting(req);
    }

    // --- email templates ---

    @GetMapping("/email-templates")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public List<EmailTemplateResponse> listEmailTemplates() {
        return adminService.listEmailTemplates();
    }

    @PutMapping("/email-templates/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public EmailTemplateResponse updateEmailTemplate(@PathVariable UUID id,
                                                     @Valid @RequestBody UpdateEmailTemplateRequest req) {
        return adminService.updateEmailTemplate(id, req);
    }

    // --- announcements ---

    @PostMapping("/announcements")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public AnnouncementResponse createAnnouncement(@Valid @RequestBody CreateAnnouncementRequest req) {
        return adminService.createAnnouncement(req);
    }

    @DeleteMapping("/announcements/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN')")
    public void deleteAnnouncement(@PathVariable UUID id) {
        adminService.deleteAnnouncement(id);
    }
}
