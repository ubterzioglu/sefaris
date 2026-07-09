import { baseApi } from "./baseApi";
import type { DashboardStats, Activity, Announcement, Task } from "@/lib/types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => "/dashboard/stats",
      providesTags: ["Dashboard"],
    }),
    getActivities: builder.query<Activity[], void>({
      query: () => "/dashboard/activities",
      providesTags: ["Dashboard"],
    }),
    getActiveAnnouncements: builder.query<Announcement[], void>({
      query: () => "/dashboard/announcements",
      providesTags: ["Announcement"],
    }),
    getMyTasks: builder.query<Task[], void>({
      query: () => "/dashboard/my-tasks",
      providesTags: ["Task"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetActivitiesQuery,
  useGetActiveAnnouncementsQuery,
  useGetMyTasksQuery,
} = dashboardApi;
