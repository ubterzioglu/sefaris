package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.SeoCampaign;

import java.util.UUID;

public interface SeoCampaignRepository extends JpaRepository<SeoCampaign, UUID> {
}
