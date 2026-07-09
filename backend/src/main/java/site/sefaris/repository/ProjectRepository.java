package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.Project;
import site.sefaris.domain.enums.ProjectStatus;

import java.util.List;
import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByStatus(ProjectStatus status);
    List<Project> findByCustomerId(UUID customerId);
    long countByStatus(ProjectStatus status);
}
