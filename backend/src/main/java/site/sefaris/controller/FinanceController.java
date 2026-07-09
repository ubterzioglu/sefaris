package site.sefaris.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import site.sefaris.dto.finance.FinanceDtos.*;
import site.sefaris.service.FinanceService;

import java.util.List;
import java.util.UUID;

/** /api/v1/finances (rehber bölüm 4.6). */
@RestController
@RequestMapping("/finances")
@PreAuthorize("hasAnyRole('SUPER_ADMIN','ADMIN','ACCOUNTANT')")
public class FinanceController {

    private final FinanceService financeService;

    public FinanceController(FinanceService financeService) {
        this.financeService = financeService;
    }

    @GetMapping
    public List<FinanceResponse> list(@RequestParam(required = false) String type,
                                      @RequestParam(required = false) String category,
                                      @RequestParam(required = false) UUID project_id) {
        return financeService.list(type, category, project_id);
    }

    @GetMapping("/summary")
    public FinanceSummaryResponse summary() {
        return financeService.summary();
    }

    @GetMapping("/project/{id}")
    public FinanceSummaryResponse projectSummary(@PathVariable UUID id) {
        return financeService.projectSummary(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FinanceResponse create(@Valid @RequestBody CreateFinanceRequest req) {
        return financeService.create(req);
    }

    @PutMapping("/{id}")
    public FinanceResponse update(@PathVariable UUID id, @Valid @RequestBody UpdateFinanceRequest req) {
        return financeService.update(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        financeService.delete(id);
    }

    @GetMapping("/profit-share/{projectId}")
    public ProfitShareResponse profitShare(@PathVariable UUID projectId) {
        return financeService.profitShare(projectId);
    }
}
