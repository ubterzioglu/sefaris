package site.sefaris.service;

import org.springframework.stereotype.Service;
import site.sefaris.domain.enums.FinanceType;
import site.sefaris.domain.enums.ProjectStatus;
import site.sefaris.domain.enums.TaskStatus;
import site.sefaris.dto.dashboard.DashboardDtos.*;
import site.sefaris.dto.task.TaskDtos.TaskResponse;
import site.sefaris.repository.ActivityLogRepository;
import site.sefaris.repository.AnnouncementRepository;
import site.sefaris.repository.FinanceRepository;
import site.sefaris.repository.ProjectRepository;
import site.sefaris.repository.TaskRepository;
import site.sefaris.security.SecurityUtils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

/** Dashboard iş mantığı (rehber bölüm 4.10). */
@Service
public class DashboardService {

    private final TaskRepository tasks;
    private final ProjectRepository projects;
    private final FinanceRepository finances;
    private final ActivityLogRepository activityLogs;
    private final AnnouncementRepository announcements;

    public DashboardService(TaskRepository tasks, ProjectRepository projects, FinanceRepository finances,
                            ActivityLogRepository activityLogs, AnnouncementRepository announcements) {
        this.tasks = tasks;
        this.projects = projects;
        this.finances = finances;
        this.activityLogs = activityLogs;
        this.announcements = announcements;
    }

    public DashboardStatsResponse stats() {
        long totalTasks = tasks.count();
        long openTasks = tasks.countByStatus(TaskStatus.OPEN);
        long completedTasks = tasks.countByStatus(TaskStatus.COMPLETED);
        long delayedTasks = tasks.countByStatus(TaskStatus.DELAYED);
        long totalProjects = projects.count();
        long activeProjects = projects.countByStatus(ProjectStatus.IN_PROGRESS);

        YearMonth current = YearMonth.now();
        BigDecimal monthlyIncome = BigDecimal.ZERO;
        BigDecimal monthlyExpense = BigDecimal.ZERO;
        for (var f : finances.findAll()) {
            LocalDate date = f.getDate();
            if (date == null || !YearMonth.from(date).equals(current)) continue;
            BigDecimal amount = f.getAmount() != null ? f.getAmount() : BigDecimal.ZERO;
            if (f.getType() == FinanceType.INCOME) {
                monthlyIncome = monthlyIncome.add(amount);
            } else if (f.getType() == FinanceType.EXPENSE) {
                monthlyExpense = monthlyExpense.add(amount);
            }
        }

        return new DashboardStatsResponse(totalTasks, openTasks, completedTasks, delayedTasks,
                totalProjects, activeProjects, monthlyIncome, monthlyExpense);
    }

    public List<ActivityLogResponse> activities() {
        return activityLogs.findTop20ByOrderByCreatedAtDesc()
                .stream().map(ActivityLogResponse::from).toList();
    }

    public List<AnnouncementResponse> announcements() {
        LocalDate today = LocalDate.now();
        return announcements.findAllByOrderByCreatedAtDesc().stream()
                .filter(a -> a.getActiveFrom() == null || !a.getActiveFrom().isAfter(today))
                .filter(a -> a.getActiveUntil() == null || !a.getActiveUntil().isBefore(today))
                .map(AnnouncementResponse::from)
                .toList();
    }

    public List<TaskResponse> myTasks() {
        return tasks.findByAssigneeId(SecurityUtils.currentUserId())
                .stream().map(TaskResponse::from).toList();
    }
}
