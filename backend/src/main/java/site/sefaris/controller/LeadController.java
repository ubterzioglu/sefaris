package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sefaris.dto.lead.LeadDtos.*;
import site.sefaris.service.LeadService;

import java.util.List;
import java.util.UUID;

/** /api/v1/leads (rehber bölüm 4.5). */
@RestController
@RequestMapping("/leads")
@PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','SEO_SPECIALIST')")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping
    public List<LeadResponse> list(@RequestParam(required = false) String status,
                                   @RequestParam(required = false) String source,
                                   @RequestParam(required = false) UUID assigned_to) {
        return leadService.list(status, source, assigned_to);
    }

    @GetMapping("/{id}")
    public LeadDetailResponse get(@PathVariable UUID id) {
        return leadService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LeadResponse create(@Valid @RequestBody CreateLeadRequest req) {
        return leadService.create(req);
    }

    @PutMapping("/{id}")
    public LeadResponse update(@PathVariable UUID id, @Valid @RequestBody UpdateLeadRequest req) {
        return leadService.update(id, req);
    }

    @PatchMapping("/{id}/status")
    public LeadResponse updateStatus(@PathVariable UUID id, @Valid @RequestBody UpdateLeadStatusRequest req) {
        return leadService.updateStatus(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        leadService.delete(id);
    }
}
