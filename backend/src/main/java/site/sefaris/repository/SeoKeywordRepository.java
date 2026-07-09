package site.sefaris.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.sefaris.domain.SeoKeyword;

import java.util.List;
import java.util.UUID;

public interface SeoKeywordRepository extends JpaRepository<SeoKeyword, UUID> {
    List<SeoKeyword> findByCampaignId(UUID campaignId);
}
