package site.sefaris.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.Announcement;
import site.sefaris.domain.EmailTemplate;
import site.sefaris.domain.SystemSetting;
import site.sefaris.domain.User;
import site.sefaris.domain.enums.AnnouncementPriority;
import site.sefaris.domain.enums.Role;
import site.sefaris.dto.UserResponse;
import site.sefaris.dto.admin.AdminDtos.*;
import site.sefaris.repository.ActivityLogRepository;
import site.sefaris.repository.AnnouncementRepository;
import site.sefaris.repository.EmailTemplateRepository;
import site.sefaris.repository.SystemSettingRepository;
import site.sefaris.repository.UserRepository;
import site.sefaris.security.SecurityUtils;

import java.util.List;
import java.util.UUID;

/** Admin iş mantığı (rehber bölüm 4.9). */
@Service
public class AdminService {

    private final UserRepository users;
    private final ActivityLogRepository activityLogs;
    private final SystemSettingRepository settings;
    private final EmailTemplateRepository templates;
    private final AnnouncementRepository announcements;
    private final ActivityLogService activity;
    private final PasswordEncoder passwordEncoder;

    public AdminService(UserRepository users, ActivityLogRepository activityLogs,
                        SystemSettingRepository settings, EmailTemplateRepository templates,
                        AnnouncementRepository announcements, ActivityLogService activity,
                        PasswordEncoder passwordEncoder) {
        this.users = users;
        this.activityLogs = activityLogs;
        this.settings = settings;
        this.templates = templates;
        this.announcements = announcements;
        this.activity = activity;
        this.passwordEncoder = passwordEncoder;
    }

    // --- users ---

    public List<UserResponse> listUsers() {
        return users.findAll().stream().map(UserResponse::from).toList();
    }

    @Transactional
    public UserResponse createUser(CreateUserRequest req) {
        if (users.existsByEmail(req.email())) {
            throw new ApiException(ErrorCode.USER_ALREADY_EXISTS, "email");
        }
        User u = new User();
        u.setEmail(req.email());
        u.setFullName(req.fullName());
        u.setRole(parseRole(req.role()));
        u.setPasswordHash(passwordEncoder.encode(req.password()));
        u.setHourlyRate(req.hourlyRate());
        users.save(u);
        activity.log("user_created", "user", u.getId(), null);
        return UserResponse.from(u);
    }

    @Transactional
    public UserResponse updateRole(UUID id, UpdateRoleRequest req) {
        User u = users.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
        u.setRole(parseRole(req.role()));
        activity.log("user_role_changed", "user", u.getId(), null);
        return UserResponse.from(u);
    }

    @Transactional
    public void deleteUser(UUID id) {
        User u = users.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
        users.delete(u);
        activity.log("user_deleted", "user", id, null);
    }

    // --- activity logs ---

    public List<ActivityLogResponse> listActivityLogs(UUID userId) {
        List<site.sefaris.domain.ActivityLog> found = userId != null
                ? activityLogs.findByUserId(userId, PageRequest.of(0, 100)).getContent()
                : activityLogs.findTop20ByOrderByCreatedAtDesc();
        return found.stream().map(ActivityLogResponse::from).toList();
    }

    // --- settings ---

    public List<SystemSettingResponse> listSettings() {
        return settings.findAll().stream().map(SystemSettingResponse::from).toList();
    }

    @Transactional
    public SystemSettingResponse upsertSetting(UpdateSettingRequest req) {
        SystemSetting s = settings.findBySettingKey(req.settingKey()).orElseGet(SystemSetting::new);
        s.setSettingKey(req.settingKey());
        s.setSettingValue(req.settingValue());
        settings.save(s);
        return SystemSettingResponse.from(s);
    }

    // --- email templates ---

    public List<EmailTemplateResponse> listEmailTemplates() {
        return templates.findAll().stream().map(EmailTemplateResponse::from).toList();
    }

    @Transactional
    public EmailTemplateResponse updateEmailTemplate(UUID id, UpdateEmailTemplateRequest req) {
        EmailTemplate t = templates.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
        if (req.subject() != null) t.setSubject(req.subject());
        if (req.bodyHtml() != null) t.setBodyHtml(req.bodyHtml());
        if (req.bodyText() != null) t.setBodyText(req.bodyText());
        if (req.isActive() != null) t.setActive(req.isActive());
        return EmailTemplateResponse.from(t);
    }

    // --- announcements ---

    @Transactional
    public AnnouncementResponse createAnnouncement(CreateAnnouncementRequest req) {
        Announcement a = new Announcement();
        a.setTitle(req.title());
        a.setContent(req.content());
        a.setPriority(parsePriority(req.priority()));
        a.setCreatedBy(SecurityUtils.currentUserId());
        announcements.save(a);
        activity.log("announcement_created", "announcement", a.getId(), null);
        return AnnouncementResponse.from(a);
    }

    @Transactional
    public void deleteAnnouncement(UUID id) {
        Announcement a = announcements.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
        announcements.delete(a);
        activity.log("announcement_deleted", "announcement", id, null);
    }

    // --- helpers ---

    private Role parseRole(String s) {
        try {
            return Role.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.NOT_FOUND, "role");
        }
    }

    private AnnouncementPriority parsePriority(String s) {
        if (s == null || s.isBlank()) return AnnouncementPriority.NORMAL;
        try {
            return AnnouncementPriority.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            return AnnouncementPriority.NORMAL;
        }
    }
}
