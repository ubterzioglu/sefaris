package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.EmailTemplate;

import java.util.Optional;
import java.util.UUID;

public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, UUID> {
    Optional<EmailTemplate> findByName(String name);
}
