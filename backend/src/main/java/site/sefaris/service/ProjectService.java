package site.sefaris.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.sefaris.common.ApiException;
import site.sefaris.common.ErrorCode;
import site.sefaris.common.PageResponse;
import site.sefaris.domain.Finance;
import site.sefaris.domain.Project;
import site.sefaris.domain.ProjectMember;
import site.sefaris.domain.enums.Currency;
import site.sefaris.domain.enums.FinanceType;
import site.sefaris.domain.enums.ProjectStatus;
import site.sefaris.dto.project.ProjectDtos.*;
import site.sefaris.dto.task.TaskDtos.TaskResponse;
import site.sefaris.repository.FinanceRepository;
import site.sefaris.repository.ProjectMemberRepository;
import site.sefaris.repository.ProjectRepository;
import site.sefaris.repository.TaskRepository;
import site.sefaris.security.SecurityUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

/** Proje iş mantığı (rehber bölüm 4.4). */
@Service
public class ProjectService {

    private final ProjectRepository projects;
    private final ProjectMemberRepository members;
    private final TaskRepository tasks;
    private final FinanceRepository finances;
    private final ActivityLogService activity;

    public ProjectService(ProjectRepository projects, ProjectMemberRepository members,
                          TaskRepository tasks, FinanceRepository finances, ActivityLogService activity) {
        this.projects = projects;
        this.members = members;
        this.tasks = tasks;
        this.finances = finances;
        this.activity = activity;
    }

    public PageResponse<ProjectResponse> list(String status, UUID customerId, int page, int limit) {
        List<ProjectResponse> all = projects.findAll().stream()
                .filter(p -> status == null || (p.getStatus() != null
                        && p.getStatus() == parseStatus(status)))
                .filter(p -> customerId == null || customerId.equals(p.getCustomerId()))
                .map(ProjectResponse::from)
                .toList();
        return PageResponse.of(all);
    }

    public ProjectDetailResponse get(UUID id) {
        Project p = find(id);
        List<ProjectMemberResponse> ms = members.findByProjectId(id).stream()
                .map(ProjectMemberResponse::from).toList();
        long taskCount = tasks.findByProjectId(id).size();
        return new ProjectDetailResponse(ProjectResponse.from(p), ms, taskCount);
    }

    @Transactional
    public ProjectResponse create(CreateProjectRequest req) {
        Project p = new Project();
        p.setName(req.name());
        p.setCustomerId(req.customerId());
        p.setDescription(req.description());
        if (req.status() != null) p.setStatus(parseStatus(req.status()));
        if (req.budgetAmount() != null) {
            if (req.budgetAmount().signum() < 0) throw new ApiException(ErrorCode.PROJECT_BUDGET_NEGATIVE, "budgetAmount");
            p.setBudgetAmount(req.budgetAmount());
        }
        if (req.budgetCurrency() != null) p.setBudgetCurrency(parseCurrency(req.budgetCurrency()));
        p.setStartDate(req.startDate());
        p.setEndDate(req.endDate());

        BigDecimal dev = req.profitShareDev() != null ? req.profitShareDev() : BigDecimal.valueOf(40);
        BigDecimal design = req.profitShareDesign() != null ? req.profitShareDesign() : BigDecimal.valueOf(20);
        BigDecimal pm = req.profitSharePm() != null ? req.profitSharePm() : BigDecimal.valueOf(20);
        BigDecimal company = req.profitShareCompany() != null ? req.profitShareCompany() : BigDecimal.valueOf(20);
        validateShares(dev, design, pm, company);
        p.setProfitShareDev(dev);
        p.setProfitShareDesign(design);
        p.setProfitSharePm(pm);
        p.setProfitShareCompany(company);

        p.setCreatedBy(SecurityUtils.currentUserId());
        projects.save(p);
        activity.log("project_created", "project", p.getId(), null);
        return ProjectResponse.from(p);
    }

    @Transactional
    public ProjectResponse update(UUID id, UpdateProjectRequest req) {
        Project p = find(id);
        if (req.name() != null) p.setName(req.name());
        if (req.customerId() != null) p.setCustomerId(req.customerId());
        if (req.description() != null) p.setDescription(req.description());
        if (req.status() != null) p.setStatus(parseStatus(req.status()));
        if (req.budgetAmount() != null) {
            if (req.budgetAmount().signum() < 0) throw new ApiException(ErrorCode.PROJECT_BUDGET_NEGATIVE, "budgetAmount");
            p.setBudgetAmount(req.budgetAmount());
        }
        if (req.budgetCurrency() != null) p.setBudgetCurrency(parseCurrency(req.budgetCurrency()));
        if (req.startDate() != null) p.setStartDate(req.startDate());
        if (req.endDate() != null) p.setEndDate(req.endDate());

        if (req.profitShareDev() != null) p.setProfitShareDev(req.profitShareDev());
        if (req.profitShareDesign() != null) p.setProfitShareDesign(req.profitShareDesign());
        if (req.profitSharePm() != null) p.setProfitSharePm(req.profitSharePm());
        if (req.profitShareCompany() != null) p.setProfitShareCompany(req.profitShareCompany());
        if (req.profitShareDev() != null || req.profitShareDesign() != null
                || req.profitSharePm() != null || req.profitShareCompany() != null) {
            validateShares(p.getProfitShareDev(), p.getProfitShareDesign(),
                    p.getProfitSharePm(), p.getProfitShareCompany());
        }

        projects.save(p);
        activity.log("project_updated", "project", p.getId(), null);
        return ProjectResponse.from(p);
    }

    @Transactional
    public void delete(UUID id) {
        projects.delete(find(id));
        activity.log("project_deleted", "project", id, null);
    }

    @Transactional
    public ProjectMemberResponse addMember(UUID projectId, AddMemberRequest req) {
        find(projectId);
        ProjectMember m = new ProjectMember();
        m.setProjectId(projectId);
        m.setUserId(req.userId());
        m.setRoleInProject(req.roleInProject());
        members.save(m);
        activity.log("project_member_added", "project", projectId, null);
        return ProjectMemberResponse.from(m);
    }

    @Transactional
    public void removeMember(UUID projectId, UUID userId) {
        find(projectId);
        members.deleteByProjectIdAndUserId(projectId, userId);
        activity.log("project_member_removed", "project", projectId, null);
    }

    public List<TaskResponse> tasks(UUID projectId) {
        find(projectId);
        return tasks.findByProjectId(projectId).stream().map(TaskResponse::from).toList();
    }

    public FinanceSummaryOfProject finances(UUID projectId) {
        find(projectId);
        List<Finance> list = finances.findByProjectId(projectId);
        BigDecimal income = list.stream()
                .filter(f -> f.getType() == FinanceType.INCOME)
                .map(Finance::getAmount)
                .filter(a -> a != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal expense = list.stream()
                .filter(f -> f.getType() == FinanceType.EXPENSE)
                .map(Finance::getAmount)
                .filter(a -> a != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return new FinanceSummaryOfProject(income, expense, income.subtract(expense));
    }

    // --- yardımcılar ---

    private Project find(UUID id) {
        return projects.findById(id).orElseThrow(() -> new ApiException(ErrorCode.PROJECT_NOT_FOUND));
    }

    private void validateShares(BigDecimal dev, BigDecimal design, BigDecimal pm, BigDecimal company) {
        BigDecimal sum = dev.add(design).add(pm).add(company);
        if (sum.compareTo(BigDecimal.valueOf(100)) != 0) {
            throw new ApiException(ErrorCode.PROFIT_SHARE_NOT_100);
        }
    }

    private ProjectStatus parseStatus(String s) {
        try {
            return ProjectStatus.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.INVALID_STATUS_TRANSITION, "status");
        }
    }

    private Currency parseCurrency(String s) {
        try {
            return Currency.valueOf(s.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ApiException(ErrorCode.NOT_FOUND, "budgetCurrency");
        }
    }
}
