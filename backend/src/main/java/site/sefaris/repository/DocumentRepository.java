package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.Document;

import java.util.List;
import java.util.UUID;

public interface DocumentRepository extends JpaRepository<Document, UUID> {
    List<Document> findByFolderPathStartingWith(String folderPath);
}
