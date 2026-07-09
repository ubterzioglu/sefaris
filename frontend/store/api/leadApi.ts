import { baseApi } from "./baseApi";
import type { Lead } from "@/lib/types";

export const leadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], { status?: string; source?: string; assigned_to?: string } | void>({
      query: (params) => ({ url: "/leads", params: params ?? undefined }),
      providesTags: ["Lead"],
    }),
    getLead: builder.query<{ lead: Lead; history: unknown[] }, string>({
      query: (id) => `/leads/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Lead", id }],
    }),
    createLead: builder.mutation<Lead, Partial<Lead>>({
      query: (body) => ({ url: "/leads", method: "POST", body }),
      invalidatesTags: ["Lead"],
    }),
    updateLead: builder.mutation<Lead, { id: string; body: Partial<Lead> }>({
      query: ({ id, body }) => ({ url: `/leads/${id}`, method: "PUT", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Lead", id }, "Lead"],
    }),
    updateLeadStatus: builder.mutation<Lead, { id: string; status: string; notes?: string }>({
      query: ({ id, status, notes }) => ({ url: `/leads/${id}/status`, method: "PATCH", body: { status, notes } }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Lead", id }, "Lead"],
    }),
    deleteLead: builder.mutation<void, string>({
      query: (id) => ({ url: `/leads/${id}`, method: "DELETE" }),
      invalidatesTags: ["Lead"],
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useGetLeadQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useUpdateLeadStatusMutation,
  useDeleteLeadMutation,
} = leadApi;
