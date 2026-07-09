package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import site.sefaris.domain.Task;
import site.sefaris.domain.enums.TaskStatus;

import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID>, JpaSpecificationExecutor<Task> {
    List<Task> findByAssigneeId(UUID assigneeId);
    List<Task> findByProjectId(UUID projectId);
    long countByStatus(TaskStatus status);
}
