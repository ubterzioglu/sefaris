package site.sefaris.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.SeoCampaign;
import site.sefaris.domain.SeoKeyword;
import site.sefaris.domain.enums.SeoTargetCountry;
import site.sefaris.dto.seo.SeoDtos.*;
import site.sefaris.repository.SeoCampaignRepository;
import site.sefaris.repository.SeoKeywordRepository;

import java.util.List;
import java.util.UUID;

/** SEO iş mantığı (rehber bölüm 4.8). */
@Service
public class SeoService {

    private final SeoCampaignRepository campaigns;
    private final SeoKeywordRepository keywords;
    private final ActivityLogService activity;

    public SeoService(SeoCampaignRepository campaigns, SeoKeywordRepository keywords, ActivityLogService activity) {
        this.campaigns = campaigns;
        this.keywords = keywords;
        this.activity = activity;
    }

    public List<SeoCampaignResponse> listCampaigns() {
        return campaigns.findAll().stream().map(SeoCampaignResponse::from).toList();
    }

    @Transactional
    public SeoCampaignResponse createCampaign(CreateCampaignRequest req) {
        SeoCampaign c = new SeoCampaign();
        c.setName(req.name());
        c.setCustomerId(req.customerId());
        c.setTargetCountry(parseCountry(req.targetCountry()));
        c.setMonthlyBudget(req.monthlyBudget());
        campaigns.save(c);
        activity.log("seo_campaign_created", "seo_campaign", c.getId(), null);
        return SeoCampaignResponse.from(c);
    }

    public SeoCampaignDetailResponse getCampaign(UUID id) {
        SeoCampaign c = campaigns.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
        List<SeoKeywordResponse> ks = keywords.findByCampaignId(id).stream()
                .map(SeoKeywordResponse::from).toList();
        return new SeoCampaignDetailResponse(SeoCampaignResponse.from(c), ks);
    }

    public List<SeoKeywordResponse> listKeywords(UUID campaignId) {
        List<SeoKeyword> found = campaignId != null
                ? keywords.findByCampaignId(campaignId)
                : keywords.findAll();
        return found.stream().map(SeoKeywordResponse::from).toList();
    }

    @Transactional
    public SeoKeywordResponse createKeyword(CreateKeywordRequest req) {
        SeoKeyword k = new SeoKeyword();
        k.setCampaignId(req.campaignId());
        k.setKeyword(req.keyword());
        k.setTargetUrl(req.targetUrl());
        keywords.save(k);
        activity.log("seo_keyword_created", "seo_keyword", k.getId(), null);
        return SeoKeywordResponse.from(k);
    }

    @Transactional
    public SeoKeywordResponse updateRank(UUID id, UpdateRankRequest req) {
        SeoKeyword k = keywords.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
        k.setPreviousRank(k.getCurrentRank());
        k.setCurrentRank(req.currentRank());
        if (req.searchVolume() != null) k.setSearchVolume(req.searchVolume());
        k.setLastChecked(java.time.LocalDate.now());
        return SeoKeywordResponse.from(k);
    }

    private SeoTargetCountry parseCountry(String s) {
        if (s == null || s.isBlank()) return null;
        try {
            return SeoTargetCountry.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.NOT_FOUND, "targetCountry");
        }
    }
}
