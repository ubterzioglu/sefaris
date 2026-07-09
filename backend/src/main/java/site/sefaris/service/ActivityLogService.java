package site.sefaris.service;

import org.springframework.stereotype.Service;
import site.sefaris.domain.ActivityLog;
import site.sefaris.repository.ActivityLogRepository;
import site.sefaris.security.SecurityUtils;

import java.util.UUID;

/** Aktivite / audit log (rehber bölüm 3 activity_logs). */
@Service
public class ActivityLogService {

    private final ActivityLogRepository repository;

    public ActivityLogService(ActivityLogRepository repository) {
        this.repository = repository;
    }

    public void log(String action, String entityType, UUID entityId, String details) {
        ActivityLog entry = new ActivityLog();
        SecurityUtils.currentUser().ifPresent(u -> entry.setUserId(u.getId()));
        entry.setAction(action);
        entry.setEntityType(entityType);
        entry.setEntityId(entityId);
        entry.setDetails(details);
        repository.save(entry);
    }
}
