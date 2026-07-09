package site.sefaris.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.domain.Finance;
import site.sefaris.domain.Project;
import site.sefaris.domain.enums.Currency;
import site.sefaris.domain.enums.FinanceCategory;
import site.sefaris.domain.enums.FinanceType;
import site.sefaris.dto.finance.FinanceDtos.*;
import site.sefaris.repository.FinanceRepository;
import site.sefaris.repository.ProjectRepository;
import site.sefaris.security.SecurityUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/** Finans iş mantığı (rehber bölüm 4.6). */
@Service
public class FinanceService {

    private final FinanceRepository finances;
    private final ProjectRepository projects;
    private final ActivityLogService activity;

    public FinanceService(FinanceRepository finances, ProjectRepository projects, ActivityLogService activity) {
        this.finances = finances;
        this.projects = projects;
        this.activity = activity;
    }

    public List<FinanceResponse> list(String type, String category, UUID projectId) {
        return finances.findAll().stream()
                .filter(f -> type == null || (f.getType() != null && f.getType().name().equalsIgnoreCase(type)))
                .filter(f -> category == null || (f.getCategory() != null && f.getCategory().name().equalsIgnoreCase(category)))
                .filter(f -> projectId == null || projectId.equals(f.getProjectId()))
                .map(FinanceResponse::from)
                .toList();
    }

    public FinanceSummaryResponse summary() {
        return summarize(finances.findAll());
    }

    public FinanceSummaryResponse projectSummary(UUID projectId) {
        return summarize(finances.findByProjectId(projectId));
    }

    @Transactional
    public FinanceResponse create(CreateFinanceRequest req) {
        Finance f = new Finance();
        f.setType(parseType(req.type()));
        if (req.category() != null) f.setCategory(parseCategory(req.category()));
        f.setProjectId(req.projectId());
        f.setAmount(req.amount());
        f.setCurrency(parseCurrency(req.currency()));
        BigDecimal rate = req.exchangeRate() != null ? req.exchangeRate() : BigDecimal.ONE;
        f.setExchangeRate(rate);
        f.setAmountEur(req.amount().multiply(rate));
        f.setDescription(req.description());
        f.setDate(req.date());
        f.setCreatedBy(SecurityUtils.currentUserId());
        finances.save(f);
        activity.log("finance_created", "finance", f.getId(), null);
        return FinanceResponse.from(f);
    }

    @Transactional
    public FinanceResponse update(UUID id, UpdateFinanceRequest req) {
        Finance f = find(id);
        if (req.type() != null) f.setType(parseType(req.type()));
        if (req.category() != null) f.setCategory(parseCategory(req.category()));
        if (req.projectId() != null) f.setProjectId(req.projectId());
        if (req.amount() != null) f.setAmount(req.amount());
        if (req.currency() != null) f.setCurrency(parseCurrency(req.currency()));
        if (req.exchangeRate() != null) f.setExchangeRate(req.exchangeRate());
        if (req.description() != null) f.setDescription(req.description());
        if (req.date() != null) f.setDate(req.date());
        // amountEur yeniden hesapla
        if (f.getAmount() != null && f.getExchangeRate() != null) {
            f.setAmountEur(f.getAmount().multiply(f.getExchangeRate()));
        }
        activity.log("finance_updated", "finance", f.getId(), null);
        return FinanceResponse.from(f);
    }

    @Transactional
    public void delete(UUID id) {
        finances.delete(find(id));
        activity.log("finance_deleted", "finance", id, null);
    }

    public ProfitShareResponse profitShare(UUID projectId) {
        Project p = projects.findById(projectId)
                .orElseThrow(() -> new ApiException(ErrorCode.PROJECT_NOT_FOUND));
        FinanceSummaryResponse s = summarize(finances.findByProjectId(projectId));
        BigDecimal totalProfit = s.netProfit();
        List<ShareLine> shares = List.of(
                shareLine("dev", totalProfit, p.getProfitShareDev()),
                shareLine("design", totalProfit, p.getProfitShareDesign()),
                shareLine("pm", totalProfit, p.getProfitSharePm()),
                shareLine("company", totalProfit, p.getProfitShareCompany())
        );
        return new ProfitShareResponse(totalProfit, shares);
    }

    // --- yardımcılar ---

    private FinanceSummaryResponse summarize(List<Finance> list) {
        BigDecimal income = BigDecimal.ZERO;
        BigDecimal expense = BigDecimal.ZERO;
        for (Finance f : list) {
            BigDecimal amount = f.getAmount() != null ? f.getAmount() : BigDecimal.ZERO;
            if (f.getType() == FinanceType.INCOME) {
                income = income.add(amount);
            } else if (f.getType() == FinanceType.EXPENSE) {
                expense = expense.add(amount);
            }
        }
        return new FinanceSummaryResponse(income, expense, income.subtract(expense));
    }

    private ShareLine shareLine(String role, BigDecimal totalProfit, BigDecimal pct) {
        BigDecimal percentage = pct != null ? pct : BigDecimal.ZERO;
        BigDecimal amount = totalProfit.multiply(percentage).divide(BigDecimal.valueOf(100));
        return new ShareLine(role, percentage, amount);
    }

    private Finance find(UUID id) {
        return finances.findById(id).orElseThrow(() -> new ApiException(ErrorCode.NOT_FOUND));
    }

    private FinanceType parseType(String s) {
        try {
            return FinanceType.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.INVALID_STATUS_TRANSITION, "type");
        }
    }

    private FinanceCategory parseCategory(String s) {
        try {
            return FinanceCategory.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.INVALID_STATUS_TRANSITION, "category");
        }
    }

    private Currency parseCurrency(String s) {
        try {
            return Currency.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.INVALID_STATUS_TRANSITION, "currency");
        }
    }
}
