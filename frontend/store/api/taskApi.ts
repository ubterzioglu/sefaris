import { baseApi } from "./baseApi";
import type { Task, TaskDetail, TaskComment, TaskStatus } from "@/lib/types";

export interface GetTasksParams {
  status?: string;
  assignee_id?: string;
  project_id?: string;
  priority?: string;
}

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], GetTasksParams | void>({
      query: (params) => ({ url: "/tasks", params: params ?? undefined }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Task" as const, id })), "Task"]
          : ["Task"],
    }),
    getTask: builder.query<TaskDetail, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Task", id }],
    }),
    createTask: builder.mutation<Task, Partial<Task> & { title: string }>({
      query: (body) => ({ url: "/tasks", method: "POST", body }),
      invalidatesTags: ["Task", "Dashboard"],
    }),
    updateTask: builder.mutation<Task, { id: string; body: Partial<Task> }>({
      query: ({ id, body }) => ({ url: `/tasks/${id}`, method: "PUT", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Task", id }, "Task"],
    }),
    // Optimistic update (rehber bölüm 2.5.3) — sürükle-bırak Kanban için
    updateTaskStatus: builder.mutation<Task, { id: string; status: TaskStatus }>({
      query: ({ id, status }) => ({ url: `/tasks/${id}/status`, method: "PATCH", body: { status } }),
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          taskApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const t = draft.find((x) => x.id === id);
            if (t) t.status = status;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: (_r, _e, { id }) => [{ type: "Task", id }, "Dashboard"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({ url: `/tasks/${id}`, method: "DELETE" }),
      invalidatesTags: ["Task", "Dashboard"],
    }),
    addComment: builder.mutation<TaskComment, { id: string; content: string }>({
      query: ({ id, content }) => ({ url: `/tasks/${id}/comments`, method: "POST", body: { content } }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Task", id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
  useAddCommentMutation,
} = taskApi;
