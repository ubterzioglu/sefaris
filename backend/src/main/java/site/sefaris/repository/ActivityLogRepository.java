package site.sefaris.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.ActivityLog;

import java.util.List;
import java.util.UUID;

public interface ActivityLogRepository extends JpaRepository<ActivityLog, UUID> {
    List<ActivityLog> findTop20ByOrderByCreatedAtDesc();
    Page<ActivityLog> findByUserId(UUID userId, Pageable pageable);
}
