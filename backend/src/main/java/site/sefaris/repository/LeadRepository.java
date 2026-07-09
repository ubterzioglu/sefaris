package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.Lead;
import site.sefaris.domain.enums.LeadStatus;

import java.util.List;
import java.util.UUID;

public interface LeadRepository extends JpaRepository<Lead, UUID> {
    List<Lead> findByStatus(LeadStatus status);
    List<Lead> findByAssignedTo(UUID assignedTo);
}
