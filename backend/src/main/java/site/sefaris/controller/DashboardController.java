package site.sefaris.controller;

import org.springframework.web.bind.annotation.*;
import site.sefaris.dto.dashboard.DashboardDtos.*;
import site.sefaris.dto.task.TaskDtos.TaskResponse;
import site.sefaris.service.DashboardService;

import java.util.List;

/** /api/v1/dashboard (rehber bölüm 4.10). Tüm oturum açmış kullanıcılar. */
@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStatsResponse stats() {
        return dashboardService.stats();
    }

    @GetMapping("/activities")
    public List<ActivityLogResponse> activities() {
        return dashboardService.activities();
    }

    @GetMapping("/announcements")
    public List<AnnouncementResponse> announcements() {
        return dashboardService.announcements();
    }

    @GetMapping("/my-tasks")
    public List<TaskResponse> myTasks() {
        return dashboardService.myTasks();
    }
}
