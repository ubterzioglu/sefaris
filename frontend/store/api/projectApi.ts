import { baseApi } from "./baseApi";
import type { Project, Paged } from "@/lib/types";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Paged<Project>, { status?: string; customer_id?: string } | void>({
      query: (params) => ({ url: "/projects", params: params ?? undefined }),
      providesTags: ["Project"],
    }),
    getProject: builder.query<{ project: Project; members: unknown[]; taskCount: number }, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Project", id }],
    }),
    createProject: builder.mutation<Project, Partial<Project> & { name: string }>({
      query: (body) => ({ url: "/projects", method: "POST", body }),
      invalidatesTags: ["Project"],
    }),
    updateProject: builder.mutation<Project, { id: string; body: Partial<Project> }>({
      query: ({ id, body }) => ({ url: `/projects/${id}`, method: "PUT", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Project", id }, "Project"],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({ url: `/projects/${id}`, method: "DELETE" }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
