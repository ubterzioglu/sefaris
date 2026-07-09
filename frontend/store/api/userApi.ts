import { baseApi } from "./baseApi";
import type { User, Activity } from "@/lib/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),
    createUser: builder.mutation<User, { email: string; fullName: string; role: string; password: string; hourlyRate?: number }>({
      query: (body) => ({ url: "/admin/users", method: "POST", body }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation<User, { id: string; role: string }>({
      query: ({ id, role }) => ({ url: `/admin/users/${id}/role`, method: "PUT", body: { role } }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/admin/users/${id}`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
    getActivityLogs: builder.query<Activity[], { user_id?: string } | void>({
      query: (params) => ({ url: "/admin/activity-logs", params: params ?? undefined }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetActivityLogsQuery,
} = userApi;
