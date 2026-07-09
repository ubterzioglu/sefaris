package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.TaskFile;

import java.util.List;
import java.util.UUID;

public interface TaskFileRepository extends JpaRepository<TaskFile, UUID> {
    List<TaskFile> findByTaskId(UUID taskId);
}
