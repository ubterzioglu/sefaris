package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import site.sefaris.domain.Finance;

import java.util.List;
import java.util.UUID;

public interface FinanceRepository extends JpaRepository<Finance, UUID>, JpaSpecificationExecutor<Finance> {
    List<Finance> findByProjectId(UUID projectId);
}
