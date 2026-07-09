package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.LeadHistory;

import java.util.List;
import java.util.UUID;

public interface LeadHistoryRepository extends JpaRepository<LeadHistory, UUID> {
    List<LeadHistory> findByLeadIdOrderByCreatedAtDesc(UUID leadId);
}
