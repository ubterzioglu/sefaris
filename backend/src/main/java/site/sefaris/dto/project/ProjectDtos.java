package site.sefaris.dto.project;

import jakarta.validation.constraints.*;
import site.sefaris.domain.Project;
import site.sefaris.domain.ProjectMember;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

/** Proje modülü DTO'ları (rehber bölüm 4.4). */
public final class ProjectDtos {

    private ProjectDtos() {}

    public record CreateProjectRequest(
            @NotBlank @Size(min = 3, max = 200) String name,
            UUID customerId,
            @Size(max = 5000) String description,
            String status,
            @DecimalMin("0") BigDecimal budgetAmount,
            String budgetCurrency,
            LocalDate startDate,
            LocalDate endDate,
            BigDecimal profitShareDev,
            BigDecimal profitShareDesign,
            BigDecimal profitSharePm,
            BigDecimal profitShareCompany
    ) {}

    public record UpdateProjectRequest(
            @Size(min = 3, max = 200) String name,
            UUID customerId,
            @Size(max = 5000) String description,
            String status,
            @DecimalMin("0") BigDecimal budgetAmount,
            String budgetCurrency,
            LocalDate startDate,
            LocalDate endDate,
            BigDecimal profitShareDev,
            BigDecimal profitShareDesign,
            BigDecimal profitSharePm,
            BigDecimal profitShareCompany
    ) {}

    public record AddMemberRequest(
            @NotNull UUID userId,
            @Size(max = 100) String roleInProject
    ) {}

    public record ProjectResponse(
            UUID id, String name, UUID customerId, String description, String status,
            BigDecimal budgetAmount, String budgetCurrency, LocalDate startDate, LocalDate endDate,
            BigDecimal profitShareDev, BigDecimal profitShareDesign, BigDecimal profitSharePm,
            BigDecimal profitShareCompany, UUID createdBy, Instant createdAt
    ) {
        public static ProjectResponse from(Project p) {
            return new ProjectResponse(
                    p.getId(), p.getName(), p.getCustomerId(), p.getDescription(),
                    p.getStatus() == null ? null : p.getStatus().name().toLowerCase(),
                    p.getBudgetAmount(),
                    p.getBudgetCurrency() == null ? null : p.getBudgetCurrency().name().toLowerCase(),
                    p.getStartDate(), p.getEndDate(),
                    p.getProfitShareDev(), p.getProfitShareDesign(), p.getProfitSharePm(),
                    p.getProfitShareCompany(), p.getCreatedBy(), p.getCreatedAt());
        }
    }

    public record ProjectMemberResponse(
            UUID id, UUID projectId, UUID userId, String roleInProject, Instant joinedAt
    ) {
        public static ProjectMemberResponse from(ProjectMember m) {
            return new ProjectMemberResponse(
                    m.getId(), m.getProjectId(), m.getUserId(), m.getRoleInProject(), m.getJoinedAt());
        }
    }

    public record ProjectDetailResponse(
            ProjectResponse project,
            List<ProjectMemberResponse> members,
            long taskCount
    ) {}

    public record FinanceSummaryOfProject(
            BigDecimal totalIncome,
            BigDecimal totalExpense,
            BigDecimal net
    ) {}
}
