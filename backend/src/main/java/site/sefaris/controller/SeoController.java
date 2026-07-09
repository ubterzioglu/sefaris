package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sefaris.dto.seo.SeoDtos.*;
import site.sefaris.service.SeoService;

import java.util.List;
import java.util.UUID;

/** /api/v1/seo (rehber bölüm 4.8). */
@RestController
@RequestMapping("/seo")
@PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','SEO_SPECIALIST')")
public class SeoController {

    private final SeoService seoService;

    public SeoController(SeoService seoService) {
        this.seoService = seoService;
    }

    @GetMapping("/campaigns")
    public List<SeoCampaignResponse> listCampaigns() {
        return seoService.listCampaigns();
    }

    @PostMapping("/campaigns")
    @ResponseStatus(HttpStatus.CREATED)
    public SeoCampaignResponse createCampaign(@Valid @RequestBody CreateCampaignRequest req) {
        return seoService.createCampaign(req);
    }

    @GetMapping("/campaigns/{id}")
    public SeoCampaignDetailResponse getCampaign(@PathVariable UUID id) {
        return seoService.getCampaign(id);
    }

    @GetMapping("/keywords")
    public List<SeoKeywordResponse> listKeywords(@RequestParam(required = false) UUID campaign_id) {
        return seoService.listKeywords(campaign_id);
    }

    @PostMapping("/keywords")
    @ResponseStatus(HttpStatus.CREATED)
    public SeoKeywordResponse createKeyword(@Valid @RequestBody CreateKeywordRequest req) {
        return seoService.createKeyword(req);
    }

    @PatchMapping("/keywords/{id}/rank")
    public SeoKeywordResponse updateRank(@PathVariable UUID id, @Valid @RequestBody UpdateRankRequest req) {
        return seoService.updateRank(id, req);
    }
}
